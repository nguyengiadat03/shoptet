"use client";

import { useState } from "react";
import { formatVND } from "@/lib/utils";
import QuantityStepper from "./QuantityStepper";
import AddToCartButton from "./AddToCartButton";

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  salePrice: number | null;
  discountPercent: number | null;
  stock: number;
}

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div>
      {/* Watermark */}
      <div className="mb-2">
        <span className="text-lg font-bold">
          <span className="text-[#b71c1c]">Shop</span>
          <span className="text-[#f6c453]">quatet</span>
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#b71c1c] mb-2">{product.name}</h1>
      <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>

      {/* Price */}
      <div className="mb-6">
        {hasDiscount && (
          <span className="text-lg text-gray-400 line-through mr-3">
            {formatVND(product.price)}
          </span>
        )}
        <span className="text-2xl font-bold text-[#b71c1c]">
          {formatVND(displayPrice)}
        </span>
      </div>

      {/* Stock Status */}
      <p className="text-green-600 text-sm mb-6 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Còn hàng
      </p>

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-4 mb-6">
        <QuantityStepper
          initialValue={1}
          min={1}
          max={product.stock}
          onChange={setQuantity}
        />
        <div className="flex-1">
          <AddToCartButton productId={product.id} quantity={quantity} />
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#b71c1c]"
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
          Giao hàng toàn quốc
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#b71c1c]"
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
          Thanh toán khi nhận hàng
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#b71c1c]"
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
          Hỗ trợ đổi trả trong 7 ngày
        </div>
      </div>
    </div>
  );
}
