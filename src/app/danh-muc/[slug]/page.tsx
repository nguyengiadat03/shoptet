import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import SortSelect from "@/components/SortSelect";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ price?: string; type?: string; sort?: string }>;
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

async function getProducts(
  categorySlug: string,
  filters: { price?: string; type?: string; sort?: string }
) {
  const category = await getCategory(categorySlug);
  if (!category) return { products: [], category: null };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { isActive: true, categoryId: category.id };
  if (filters.price) where.priceRange = filters.price;
  if (filters.type) where.productType = filters.type;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: "desc" };
  if (filters.sort === "price-asc") orderBy = { salePrice: "asc" };
  else if (filters.sort === "price-desc") orderBy = { salePrice: "desc" };
  else if (filters.sort === "name") orderBy = { name: "asc" };

  const products = await prisma.product.findMany({ where, orderBy });
  return { products, category };
}

async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Không tìm thấy danh mục" };
  return {
    title: category.name,
    description:
      category.description || `Danh mục ${category.name} - Shop Quà Tết Việt`,
    openGraph: {
      title: category.name,
      description: category.description || `Danh mục ${category.name}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const filters = await searchParams;
  const [{ products, category }, categories] = await Promise.all([
    getProducts(slug, filters),
    getAllCategories(),
  ]);

  if (!category) notFound();

  return (
    <>
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
                name: category.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/danh-muc/${slug}`,
              },
            ],
          }),
        }}
      />

      <div className="bg-gradient-to-b from-[#fff8e7] to-white min-h-screen">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#c41e3a] to-[#8b0000] py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-10 text-6xl">🏮</div>
            <div className="absolute bottom-5 right-10 text-6xl">🧧</div>
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="breadcrumb text-white/70 mb-4">
              <Link href="/" className="hover:text-white">
                🏠 Trang chủ
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-[#ffd700] font-medium">
                {category.name}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-white/80 mt-3 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                categories={categories}
                currentSlug={slug}
                currentFilters={filters}
              />
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-[#f2c18d]/30">
                <p className="text-gray-600 text-sm">
                  Hiển thị{" "}
                  <span className="font-semibold text-[#c41e3a]">
                    {products.length}
                  </span>{" "}
                  sản phẩm
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Sắp xếp:</span>
                  <SortSelect currentSort={filters.sort} />
                </div>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showAddToCart
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#f2c18d]/30">
                  <span className="text-6xl mb-4 block">📦</span>
                  <p className="text-gray-500 text-lg">
                    Không có sản phẩm nào trong danh mục này.
                  </p>
                  <Link href="/" className="btn btn-primary mt-6 inline-block">
                    ← Quay về trang chủ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
