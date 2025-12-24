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
    where: {
      categoryId,
      id: { not: currentId },
      isActive: true,
    },
    take: 4,
  });
}

async function getSidebarProducts(currentId: string) {
  return prisma.product.findMany({
    where: {
      id: { not: currentId },
      isActive: true,
      isFeatured: true,
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }

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

  if (!product) {
    notFound();
  }

  const [relatedProducts, sidebarProducts] = await Promise.all([
    getRelatedProducts(product.categoryId, product.id),
    getSidebarProducts(product.id),
  ]);

  const images = JSON.parse(product.images) as string[];
  const displayPrice = product.salePrice || product.price;

  return (
    <>
      {/* Product Schema */}
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
              seller: {
                "@type": "Organization",
                name: "Shop Quà Tết Việt",
              },
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: process.env.NEXT_PUBLIC_SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: product.category.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/danh-muc/${product.category.slug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/san-pham/${slug}`,
              },
            ],
          }),
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="breadcrumb">
            <Link href="/">TRANG CHỦ</Link>
            <span>/</span>
            <Link href={`/danh-muc/${product.category.slug}`}>
              {product.category.name.toUpperCase()}
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Gallery */}
                  <ProductGallery images={images} productName={product.name} />

                  {/* Product Info */}
                  <ProductInfo product={product} />
                </div>
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <button className="px-4 py-2 bg-[#b71c1c] text-white rounded-md text-sm font-medium mb-6">
                  MÔ TẢ
                </button>

                <div className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-bold text-[#b71c1c] mb-4">
                    Giỏ quà Tết 2026 – {product.name}
                  </h2>
                  <p className="mb-4">
                    <strong>Mã sản phẩm:</strong> {product.sku}
                  </p>
                  {product.longDesc ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.longDesc }}
                    />
                  ) : (
                    <p>{product.shortDesc}</p>
                  )}
                </div>

                <div className="mt-6">
                  <button className="btn btn-primary btn-shimmer">
                    XEM THÊM
                  </button>
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#b71c1c] mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#b71c1c]"></span>
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

            {/* Sidebar - Có thể bạn sẽ thích */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-[#b71c1c] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#b71c1c]"></span>
                  CÓ THỂ BẠN SẼ THÍCH
                </h3>
                <div className="space-y-4">
                  {sidebarProducts.map((p) => {
                    const pImages = JSON.parse(p.images) as string[];
                    return (
                      <Link
                        key={p.id}
                        href={`/san-pham/${p.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pImages[0] || "/images/placeholder.jpg"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-[#b71c1c] font-medium group-hover:underline line-clamp-2">
                            {p.name}
                          </h4>
                          <div className="mt-1">
                            {p.salePrice && p.salePrice < p.price && (
                              <span className="text-xs text-gray-400 line-through mr-2">
                                {formatVND(p.price)}
                              </span>
                            )}
                            <span className="text-sm font-bold text-[#b71c1c]">
                              {formatVND(p.salePrice || p.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
