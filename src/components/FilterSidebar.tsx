"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterSidebarProps {
  categories: Category[];
  currentSlug: string;
  currentFilters: { price?: string; type?: string };
}

const priceRanges = [
  { value: "duoi-500k", label: "Dưới 500.000đ" },
  { value: "500k-1trieu", label: "500.000đ - 1.000.000đ" },
  { value: "1-2trieu", label: "1.000.000đ - 2.000.000đ" },
  { value: "tren-2trieu", label: "Trên 2.000.000đ" },
];

const productTypes = [
  { value: "gio-qua", label: "Giỏ quà Tết" },
  { value: "hop-qua", label: "Hộp quà Tết" },
  { value: "khay-mut", label: "Khay mứt Tết" },
];

export default function FilterSidebar({
  categories,
  currentSlug,
  currentFilters,
}: FilterSidebarProps) {
  const router = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value && value !== currentFilters[key as keyof typeof currentFilters]) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    router.push(url.pathname + url.search);
  };

  return (
    <aside className="filter-sidebar">
      {/* Categories */}
      <div className="filter-section">
        <h3 className="filter-title">Danh mục</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/danh-muc/${cat.slug}`}
              className={`filter-link ${
                cat.slug === currentSlug ? "active font-semibold" : ""
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h3 className="filter-title">Set theo giá</h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleFilterChange("price", range.value)}
              className={`filter-link w-full text-left ${
                currentFilters.price === range.value
                  ? "active font-semibold"
                  : ""
              }`}
            >
              {range.label}
            </button>
          ))}
          {currentFilters.price && (
            <button
              onClick={() => handleFilterChange("price", "")}
              className="filter-link w-full text-left text-gray-400 italic"
            >
              Xóa bộ lọc giá
            </button>
          )}
        </div>
      </div>

      {/* Product Type */}
      <div className="filter-section">
        <h3 className="filter-title">Set theo loại</h3>
        <div className="space-y-1">
          {productTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleFilterChange("type", type.value)}
              className={`filter-link w-full text-left ${
                currentFilters.type === type.value
                  ? "active font-semibold"
                  : ""
              }`}
            >
              {type.label}
            </button>
          ))}
          {currentFilters.type && (
            <button
              onClick={() => handleFilterChange("type", "")}
              className="filter-link w-full text-left text-gray-400 italic"
            >
              Xóa bộ lọc loại
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
