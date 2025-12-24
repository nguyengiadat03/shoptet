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
    <div>
      {/* Watermark */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-lg font-bold">
          <span className="text-[#b71c1c]">Shop</span>
          <span className="text-[#f6c453]">quatet</span>
        </span>
      </div>

      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                index === selectedIndex
                  ? "border-[#b71c1c]"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
