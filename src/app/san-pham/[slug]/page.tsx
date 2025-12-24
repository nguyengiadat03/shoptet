import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductCard from "@/components/ProductCard";
import { formatVND } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product;
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: currentId }, isActive: true },
    take: 4,
  });
}

async function getSidebarProducts(currentId: string) {
  return prisma.product.findMany({
    where: { id: { not: currentId }, isActive: true, isFeatured: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  const images = JSON.parse(product.images) as string[];
  return {
    title: product.name,
    description: product.shortDesc || `${product.name} - Shop Quà Tết Việt`,
    openGraph: {
      title: product.name,
      description: product.shortDesc || product.name,
      images: images.map((img) => ({
        url: img,
        width: 800,
        height: 800,
        alt: product.name,
      })),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [relatedProducts, sidebarProducts] = await Promise.all([
    getRelatedProducts(product.categoryId, product.id),
    getSidebarProducts(product.id),
  ]);

  const images = JSON.parse(product.images) as string[];
  const displayPrice = product.salePrice || product.price;

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDesc,
            sku: product.sku,
            image: images,
            offers: {
              "@type": "Offer",
              price: displayPrice,
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "Shop Quà Tết Việt" },
            },
          }),
        }}
      />

      <div className="bg-gradient-to-b from-[#fff8e7] to-white min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="breadcrumb">
            <Link href="/" className="hover:text-[#c41e3a]">
              🏠 Trang chủ
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href={`/danh-muc/${product.category.slug}`}
              className="hover:text-[#c41e3a]"
            >
              {product.category.name}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Product Main */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-[#f2c18d]/30 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProductGallery images={images} productName={product.name} />
                  <ProductInfo product={product} />
                </div>
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-[#f2c18d]/30 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white rounded-lg text-sm font-semibold">
                    📋 MÔ TẢ SẢN PHẨM
                  </span>
                </div>

                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold text-[#c41e3a] mb-4 font-[family-name:var(--font-playfair)]">
                    🎁 Giỏ quà Tết 2026 – {product.name}
                  </h2>
                  <p className="mb-4 text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Mã sản phẩm:
                    </span>{" "}
                    {product.sku}
                  </p>
                  {product.longDesc ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.longDesc }}
                      className="text-gray-600 leading-relaxed"
                    />
                  ) : (
                    <p className="text-gray-600">{product.shortDesc}</p>
                  )}
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-[#f2c18d]/30">
                  <h2 className="text-xl font-bold text-[#c41e3a] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-gradient-to-b from-[#ffd700] to-[#c41e3a] rounded-full"></span>
                    SẢN PHẨM TƯƠNG TỰ
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-md border border-[#f2c18d]/30 sticky top-28">
                <h3 className="text-lg font-bold text-[#c41e3a] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-[#ffd700] to-[#c41e3a] rounded-full"></span>
                  CÓ THỂ BẠN SẼ THÍCH
                </h3>
                <div className="space-y-4">
                  {sidebarProducts.map((p) => {
                    const pImages = JSON.parse(p.images) as string[];
                    return (
                      <Link
                        key={p.id}
                        href={`/san-pham/${p.slug}`}
                        className="flex gap-3 group p-2 rounded-xl hover:bg-[#fff8e7] transition"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-[#f2c18d]/50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pImages[0] || "/images/placeholder.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-[#c41e3a] font-medium group-hover:text-[#8b0000] line-clamp-2 transition">
                            {p.name}
                          </h4>
                          <div className="mt-1.5">
                            {p.salePrice && p.salePrice < p.price && (
                              <span className="text-xs text-gray-400 line-through mr-2">
                                {formatVND(p.price)}
                              </span>
                            )}
                            <span className="text-sm font-bold text-[#c41e3a]">
                              {formatVND(p.salePrice || p.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="mt-6 p-4 bg-gradient-to-br from-[#fff8e7] to-[#ffe4c4] rounded-xl border border-[#ffd700]/30">
                  <p className="text-sm font-semibold text-[#c41e3a] mb-2">
                    🎊 Tết Bính Ngọ 2026
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Liên hệ ngay để được tư vấn và báo giá tốt nhất!
                  </p>
                  <a
                    href="tel:0934022424"
                    className="btn btn-gold btn-shimmer w-full text-sm py-2.5"
                  >
                    📞 0934 022 424
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
