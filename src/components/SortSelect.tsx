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
      className="form-input py-2 px-3 w-auto text-sm"
      defaultValue={currentSort || ""}
      onChange={handleChange}
    >
      <option value="">Mặc định</option>
      <option value="price-asc">Giá thấp đến cao</option>
      <option value="price-desc">Giá cao đến thấp</option>
      <option value="name">Tên A-Z</option>
    </select>
  );
}
