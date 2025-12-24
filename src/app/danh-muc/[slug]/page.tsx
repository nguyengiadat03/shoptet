import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ price?: string; type?: string; sort?: string }>;
}

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  return category;
}

async function getProducts(
  categorySlug: string,
  filters: { price?: string; type?: string; sort?: string }
) {
  const category = await getCategory(categorySlug);
  if (!category) return { products: [], category: null };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isActive: true,
    categoryId: category.id,
  };

  // Filter by price range
  if (filters.price) {
    where.priceRange = filters.price;
  }

  // Filter by product type
  if (filters.type) {
    where.productType = filters.type;
  }

  // Sort options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: "desc" };
  if (filters.sort === "price-asc") {
    orderBy = { salePrice: "asc" };
  } else if (filters.sort === "price-desc") {
    orderBy = { salePrice: "desc" };
  } else if (filters.sort === "name") {
    orderBy = { name: "asc" };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return { products, category };
}

async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Không tìm thấy danh mục" };
  }

  return {
    title: category.name,
    description: category.description || `Danh mục ${category.name} - Shop Quà Tết Việt`,
    openGraph: {
      title: category.name,
      description: category.description || `Danh mục ${category.name}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const filters = await searchParams;
  const [{ products, category }, categories] = await Promise.all([
    getProducts(slug, filters),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <>
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
                name: category.name,
                item: `${process.env.NEXT_PUBLIC_SITE_URL}/danh-muc/${slug}`,
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
            <span className="text-gray-800 font-medium uppercase">
              {category.name}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-12">
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
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#b71c1c]">
                  {category.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sắp xếp:</span>
                  <select
                    className="form-input py-2 px-3 w-auto text-sm"
                    defaultValue={filters.sort || ""}
                    onChange={(e) => {
                      const url = new URL(window.location.href);
                      if (e.target.value) {
                        url.searchParams.set("sort", e.target.value);
                      } else {
                        url.searchParams.delete("sort");
                      }
                      window.location.href = url.toString();
                    }}
                  >
                    <option value="">Mặc định</option>
                    <option value="price-asc">Giá thấp đến cao</option>
                    <option value="price-desc">Giá cao đến thấp</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">
                    Không có sản phẩm nào trong danh mục này.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
