"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex] || "/images/placeholder.svg";

  return (
    <div className="relative">
      {/* Watermark */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-lg font-bold bg-white/90 px-3 py-1 rounded-full shadow-md">
          <span className="text-[#c41e3a]">Shop</span>
          <span className="text-[#daa520]">quatet</span>
        </span>
      </div>

      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 border-2 border-[#f2c18d]/50 shadow-lg">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-[#c41e3a] shadow-md scale-105"
                  : "border-gray-200 hover:border-[#ffd700]"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
