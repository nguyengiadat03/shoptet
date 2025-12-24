"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/cart-actions";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  size?: "small" | "normal";
}

export default function AddToCartButton({
  productId,
  quantity = 1,
  size = "normal",
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      await addToCart(productId, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  const sizeClasses =
    size === "small" ? "py-2.5 px-4 text-xs" : "py-3.5 px-6 text-sm";

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`btn w-full ${sizeClasses} ${
        isPending ? "opacity-70 cursor-not-allowed" : ""
      } ${
        added
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white hover:from-[#8b0000] hover:to-[#c41e3a]"
      } shadow-md hover:shadow-lg transition-all`}
    >
      {isPending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Đang thêm...
        </span>
      ) : added ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Đã thêm!
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Thêm vào giỏ
        </span>
      )}
    </button>
  );
}
