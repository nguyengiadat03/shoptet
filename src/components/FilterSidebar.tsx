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
  { value: "duoi-500k", label: "Dưới 500.000đ", icon: "💰" },
  { value: "500k-1trieu", label: "500K - 1 triệu", icon: "💵" },
  { value: "1-2trieu", label: "1 - 2 triệu", icon: "💎" },
  { value: "tren-2trieu", label: "Trên 2 triệu", icon: "👑" },
];

const productTypes = [
  { value: "gio-qua", label: "Giỏ quà Tết", icon: "🧺" },
  { value: "hop-qua", label: "Hộp quà Tết", icon: "📦" },
  { value: "khay-mut", label: "Khay mứt Tết", icon: "🍬" },
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
    <aside className="filter-sidebar sticky top-28">
      {/* Promo Box */}
      <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white p-5 rounded-xl mb-6 relative overflow-hidden">
        <div className="absolute top-2 right-2 text-3xl opacity-20">🎊</div>
        <p className="text-[#ffd700] font-bold text-sm mb-1">
          🐴 Tết Bính Ngọ 2026
        </p>
        <p className="text-white/90 text-xs">Giảm đến 30% tất cả sản phẩm</p>
      </div>

      {/* Categories */}
      <div className="filter-section">
        <h3 className="filter-title">
          <span className="text-lg">📂</span> Danh mục
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/danh-muc/${cat.slug}`}
              className={`filter-link flex items-center gap-2 ${
                cat.slug === currentSlug
                  ? "active bg-[#fff8e7] text-[#c41e3a] font-semibold"
                  : ""
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h3 className="filter-title">
          <span className="text-lg">💰</span> Theo giá
        </h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleFilterChange("price", range.value)}
              className={`filter-link w-full text-left flex items-center gap-2 ${
                currentFilters.price === range.value
                  ? "active bg-[#fff8e7] text-[#c41e3a] font-semibold"
                  : ""
              }`}
            >
              <span>{range.icon}</span>
              {range.label}
            </button>
          ))}
          {currentFilters.price && (
            <button
              onClick={() => handleFilterChange("price", "")}
              className="text-xs text-[#c41e3a] hover:underline mt-2 flex items-center gap-1"
            >
              ✕ Xóa bộ lọc giá
            </button>
          )}
        </div>
      </div>

      {/* Product Type */}
      <div className="filter-section">
        <h3 className="filter-title">
          <span className="text-lg">🎁</span> Loại sản phẩm
        </h3>
        <div className="space-y-1">
          {productTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handleFilterChange("type", type.value)}
              className={`filter-link w-full text-left flex items-center gap-2 ${
                currentFilters.type === type.value
                  ? "active bg-[#fff8e7] text-[#c41e3a] font-semibold"
                  : ""
              }`}
            >
              <span>{type.icon}</span>
              {type.label}
            </button>
          ))}
          {currentFilters.type && (
            <button
              onClick={() => handleFilterChange("type", "")}
              className="text-xs text-[#c41e3a] hover:underline mt-2 flex items-center gap-1"
            >
              ✕ Xóa bộ lọc loại
            </button>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-6 p-4 bg-[#fff8e7] rounded-xl border border-[#ffd700]/30 text-center">
        <p className="text-sm font-semibold text-[#c41e3a] mb-2">Cần tư vấn?</p>
        <a
          href="tel:0934022424"
          className="btn btn-primary btn-shimmer w-full text-sm py-2.5"
        >
          📞 0934 022 424
        </a>
      </div>
    </aside>
  );
}
