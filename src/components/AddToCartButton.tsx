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

  const sizeClasses = size === "small" 
    ? "py-2 px-3 text-xs" 
    : "py-3 px-6 text-sm";

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`btn btn-primary btn-shimmer w-full ${sizeClasses} ${
        isPending ? "opacity-70 cursor-not-allowed" : ""
      } ${added ? "bg-green-600 hover:bg-green-700" : ""}`}
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
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
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Đã thêm!
        </span>
      ) : (
        "THÊM VÀO GIỎ HÀNG"
      )}
    </button>
  );
}
