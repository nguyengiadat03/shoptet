import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import ContactFormSection from "@/components/ContactFormSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export const revalidate = 3600;

async function getHomeData() {
  const [khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials] = await Promise.all([
    prisma.product.findMany({
      where: { productType: "khay-mut", isActive: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { productType: "gio-qua", isActive: true },
      take: 8,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.product.findMany({
      where: { productType: "hop-qua", isActive: true },
      take: 8,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
    }),
  ]);

  return { khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials };
}

export default async function HomePage() {
  const { khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials } = await getHomeData();

  return (
    <>
      {/* Hero Banner Section */}
      <section className="hero-section py-16 md:py-24 lg:py-32 relative">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float hidden lg:block">🏮</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float hidden lg:block" style={{animationDelay: '1s'}}>🧧</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-15 animate-float hidden lg:block" style={{animationDelay: '0.5s'}}>🎊</div>
        <div className="absolute bottom-10 right-1/4 text-5xl opacity-15 animate-float hidden lg:block" style={{animationDelay: '1.5s'}}>🐴</div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ffd700] text-[#8b0000] px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse-gold">
              <span>🐴</span>
              <span>TẾT BÍNH NGỌ 2026</span>
              <span>🐴</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-playfair)]">
              50+ Mẫu Giỏ Quà Tết Đẹp
              <br />
              <span className="text-[#ffd700]">Hộp Quà Tết 2026</span> Sang Trọng
            </h1>
