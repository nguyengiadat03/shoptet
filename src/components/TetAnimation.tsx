"use client";

import { useEffect, useState } from "react";

export default function TetAnimation() {
  const [petals, setPetals] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
    type: "mai" | "dao";
  }>>([]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    
    if (prefersReducedMotion) return;

    // Reduce density on mobile
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 5 : 12;

    const newPetals = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      size: 12 + Math.random() * 12,
      type: Math.random() > 0.5 ? "mai" : "dao" as "mai" | "dao",
    }));

    setPetals(newPetals);

    // Cleanup
    return () => setPetals([]);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: petal.size,
            height: petal.size,
          }}
        >
          {petal.type === "mai" ? (
            // Hoa mai - màu vàng
            <svg viewBox="0 0 24 24" fill="#f6c453">
              <path d="M12 2C12 2 12 8 8 10C4 12 2 12 2 12C2 12 4 12 8 14C12 16 12 22 12 22C12 22 12 16 16 14C20 12 22 12 22 12C22 12 20 12 16 10C12 8 12 2 12 2Z" />
            </svg>
          ) : (
            // Hoa đào - màu hồng
            <svg viewBox="0 0 24 24" fill="#ff9eb5">
              <path d="M12 2C12 2 12 8 8 10C4 12 2 12 2 12C2 12 4 12 8 14C12 16 12 22 12 22C12 22 12 16 16 14C20 12 22 12 22 12C22 12 20 12 16 10C12 8 12 2 12 2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
