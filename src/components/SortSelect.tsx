"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface SortSelectProps {
  currentSort?: string;
}

export default function SortSelect({ currentSort }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="px-4 py-2.5 bg-white border-2 border-[#f2c18d] rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 cursor-pointer transition-all"
      defaultValue={currentSort || ""}
      onChange={handleChange}
    >
      <option value="">🔄 Mặc định</option>
      <option value="price-asc">💰 Giá thấp → cao</option>
      <option value="price-desc">💎 Giá cao → thấp</option>
      <option value="name">🔤 Tên A-Z</option>
    </select>
  );
}
