import { Metadata } from "next";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";

export const metadata: Metadata = {
  title: "Tìm kiếm sản phẩm",
  description: "Tìm kiếm sản phẩm quà Tết - Shop Quà Tết Việt",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

async function searchProducts(query: string) {
  if (!query || query.length < 2) return [];

  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query } },
        { sku: { contains: query } },
        { shortDesc: { contains: query } },
      ],
    },
    take: 20,
    orderBy: { createdAt: "desc" },
  });
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const products = q ? await searchProducts(q) : [];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#b71c1c] mb-6">TÌM KIẾM</h1>

        {/* Search Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <SearchForm initialQuery={q || ""} />
        </div>

        {/* Results */}
        {q && (
          <>
            <p className="text-gray-600 mb-6">
              {products.length > 0 ? (
                <>
                  Tìm thấy <strong>{products.length}</strong> sản phẩm cho từ
                  khóa &quot;<strong>{q}</strong>&quot;
                </>
              ) : (
                <>
                  Không tìm thấy sản phẩm nào cho từ khóa &quot;
                  <strong>{q}</strong>&quot;
                </>
              )}
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-500">
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}
          </>
        )}

        {!q && (
          <div className="bg-white rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500">
              Nhập từ khóa để tìm kiếm sản phẩm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
