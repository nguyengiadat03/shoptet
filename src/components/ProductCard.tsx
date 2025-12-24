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
    isFeatured?: boolean;
  };
  showAddToCart?: boolean;
}

export default function ProductCard({
  product,
  showAddToCart = false,
}: ProductCardProps) {
  const images = JSON.parse(product.images) as string[];
  const mainImage = images[0] || "/images/placeholder.svg";
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const displayPrice = product.salePrice || product.price;

  return (
    <div className="product-card relative group">
      {/* Badge Discount */}
      {hasDiscount &&
        product.discountPercent &&
        product.discountPercent > 0 && (
          <div className="badge-discount">-{product.discountPercent}%</div>
        )}

      {/* Featured Badge */}
      {product.isFeatured && <div className="badge-new">HOT 🔥</div>}

      {/* Watermark Logo */}
      <div className="absolute top-3 left-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-bold bg-white/90 px-2 py-1 rounded-full shadow-sm">
          <span className="text-[#c41e3a]">Shop</span>
          <span className="text-[#daa520]">quatet</span>
        </span>
      </div>

      {/* Product Image */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="block relative overflow-hidden"
      >
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="product-name mb-3 min-h-[42px] hover:text-[#8b0000] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Prices */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {hasDiscount && (
            <span className="price-original">{formatVND(product.price)}</span>
          )}
          <span className="price-sale">{formatVND(displayPrice)}</span>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <AddToCartButton productId={product.id} size="small" />
        )}
      </div>
    </div>
  );
}
