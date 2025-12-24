import Image from "next/image";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    sku: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    discountPercent: number | null;
    images: string;
  };
  showAddToCart?: boolean;
}

export default function ProductCard({
  product,
  showAddToCart = false,
}: ProductCardProps) {
  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0] || "/images/placeholder.jpg";
  const hasDiscount =
    product.salePrice && product.salePrice < product.price;
  const displayPrice = product.salePrice || product.price;

  return (
    <div className="product-card relative group">
      {/* Badge Discount */}
      {hasDiscount && product.discountPercent && product.discountPercent > 0 && (
        <div className="badge-discount z-10">
          -{product.discountPercent}% GIẢM
        </div>
      )}

      {/* Watermark Logo */}
      <div className="absolute top-3 left-3 z-10 opacity-80">
        <span className="text-sm font-bold">
          <span className="text-[#b71c1c]">Shop</span>
          <span className="text-[#f6c453]">quatet</span>
        </span>
      </div>

      {/* Product Image */}
      <Link href={`/san-pham/${product.slug}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="product-name mb-2 min-h-[40px]">{product.name}</h3>
        </Link>

        {/* Prices */}
        <div className="flex items-center gap-2 flex-wrap">
          {hasDiscount && (
            <span className="price-original">{formatVND(product.price)}</span>
          )}
          <span className="price-sale">{formatVND(displayPrice)}</span>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <div className="mt-3">
            <AddToCartButton productId={product.id} size="small" />
          </div>
        )}
      </div>
    </div>
  );
}
