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
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#ffd700] text-[#8b0000] text-xs font-bold px-3 py-1 rounded-full">
          🐴 Tết 2026
        </span>
        {hasDiscount && product.discountPercent && (
          <span className="bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#c41e3a] mb-2 font-[family-name:var(--font-playfair)]">
        {product.name}
      </h1>
      <p className="text-gray-500 text-sm mb-5">
        Mã SP: <span className="font-medium">{product.sku}</span>
      </p>

      {/* Price */}
      <div className="mb-6 p-4 bg-gradient-to-r from-[#fff8e7] to-white rounded-xl border border-[#ffd700]/30">
        {hasDiscount && (
          <span className="text-lg text-gray-400 line-through mr-3">
            {formatVND(product.price)}
          </span>
        )}
        <span className="text-3xl font-bold text-[#c41e3a]">
          {formatVND(displayPrice)}
        </span>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 text-green-600 text-sm mb-6">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Còn hàng - Sẵn sàng giao ngay</span>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
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

      {/* Features */}
      <div className="border-t border-gray-100 pt-6 space-y-3">
        {[
          { icon: "🚚", text: "Giao hàng toàn quốc" },
          { icon: "💵", text: "Thanh toán khi nhận hàng (COD)" },
          { icon: "🔄", text: "Đổi trả trong 7 ngày" },
          { icon: "🎁", text: "Gói quà miễn phí" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Hotline */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#c41e3a] to-[#8b0000] rounded-xl text-white">
        <p className="text-sm mb-1">Đặt hàng nhanh - Tư vấn miễn phí:</p>
        <a
          href="tel:0934022424"
          className="text-2xl font-bold text-[#ffd700] hover:underline"
        >
          📞 0934 022 424
        </a>
      </div>
    </div>
  );
}
