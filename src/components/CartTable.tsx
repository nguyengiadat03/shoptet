"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { updateCartItem, removeFromCart } from "@/lib/cart-actions";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string;
  };
}

interface CartTableProps {
  items: CartItem[];
}

export default function CartTable({ items }: CartTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-[#fff8e7] to-white border-b border-[#f2c18d]/50">
            <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
              Sản phẩm
            </th>
            <th className="text-center py-4 px-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
              Đơn giá
            </th>
            <th className="text-center py-4 px-4 text-xs font-semibold text-gray-500 uppercase">
              Số lượng
            </th>
            <th className="text-right py-4 px-4 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">
              Tổng
            </th>
            <th className="py-4 px-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  const images = JSON.parse(item.product.images) as string[];
  const price = item.product.salePrice || item.product.price;
  const total = price * item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    startTransition(async () => {
      await updateCartItem(item.id, newQuantity);
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      await removeFromCart(item.id);
    });
  };

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-[#fff8e7]/50 transition ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-[#f2c18d]/50">
            <Image
              src={images[0] || "/images/placeholder.svg"}
              alt={item.product.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <Link
            href={`/san-pham/${item.product.slug}`}
            className="text-[#c41e3a] font-medium hover:text-[#8b0000] line-clamp-2 transition"
          >
            {item.product.name}
          </Link>
        </div>
      </td>
      <td className="py-4 px-4 text-center hidden md:table-cell">
        <span className="font-medium text-gray-700">{formatVND(price)}</span>
      </td>
      <td className="py-4 px-4">
        <div className="inline-flex items-center border-2 border-[#f2c18d] rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1 || isPending}
            className="w-10 h-10 flex items-center justify-center bg-[#fff8e7] hover:bg-[#ffd700]/30 text-[#c41e3a] font-bold transition disabled:opacity-40"
          >
            −
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-12 h-10 text-center font-bold border-none"
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isPending}
            className="w-10 h-10 flex items-center justify-center bg-[#fff8e7] hover:bg-[#ffd700]/30 text-[#c41e3a] font-bold transition"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-4 px-4 text-right hidden sm:table-cell">
        <span className="font-bold text-[#c41e3a] text-lg">
          {formatVND(total)}
        </span>
      </td>
      <td className="py-4 px-2">
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          aria-label="Xóa"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}
