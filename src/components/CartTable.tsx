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
    <table className="cart-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th className="hidden md:table-cell">Đơn giá</th>
          <th>Số lượng</th>
          <th className="hidden sm:table-cell">Tổng</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <CartRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
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
    <tr className={isPending ? "opacity-50" : ""}>
      <td>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={images[0] || "/images/placeholder.jpg"}
              alt={item.product.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <Link
            href={`/san-pham/${item.product.slug}`}
            className="text-[#b71c1c] font-medium hover:underline line-clamp-2"
          >
            {item.product.name}
          </Link>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span className="font-medium">{formatVND(price)}</span>
      </td>
      <td>
        <div className="quantity-stepper inline-flex">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1 || isPending}
            className="disabled:opacity-50"
          >
            −
          </button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="text-center"
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isPending}
          >
            +
          </button>
        </div>
      </td>
      <td className="hidden sm:table-cell">
        <span className="font-bold text-[#b71c1c]">{formatVND(total)}</span>
      </td>
      <td>
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="p-2 text-gray-400 hover:text-red-600 transition"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}
