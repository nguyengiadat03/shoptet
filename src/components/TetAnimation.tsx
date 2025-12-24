"use client";

import { useMemo, useSyncExternalStore } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: "mai" | "dao" | "lantern" | "confetti";
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 10,
    size: 14 + Math.random() * 14,
    type: ["mai", "dao", "lantern", "confetti"][
      Math.floor(Math.random() * 4)
    ] as Petal["type"],
  }));
}

// Custom hook to check if animations should be shown
function useAnimationPreference() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true // Server-side default
  );
}

function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth < 768,
    () => false // Server-side default
  );
}

export default function TetAnimation() {
  const showAnimations = useAnimationPreference();
  const isMobile = useIsMobile();

  const petals = useMemo(() => {
    const count = isMobile ? 8 : 15;
    return generatePetals(count);
  }, [isMobile]);

  if (!showAnimations) return null;

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
          {petal.type === "mai" && (
            <svg viewBox="0 0 24 24" fill="#ffd700">
              <path d="M12 2C12 2 12 8 8 10C4 12 2 12 2 12C2 12 4 12 8 14C12 16 12 22 12 22C12 22 12 16 16 14C20 12 22 12 22 12C22 12 20 12 16 10C12 8 12 2 12 2Z" />
            </svg>
          )}
          {petal.type === "dao" && (
            <svg viewBox="0 0 24 24" fill="#ff6b81">
              <path d="M12 2C12 2 12 8 8 10C4 12 2 12 2 12C2 12 4 12 8 14C12 16 12 22 12 22C12 22 12 16 16 14C20 12 22 12 22 12C22 12 20 12 16 10C12 8 12 2 12 2Z" />
            </svg>
          )}
          {petal.type === "lantern" && <span className="text-2xl">🏮</span>}
          {petal.type === "confetti" && <span className="text-xl">✨</span>}
        </div>
      ))}
    </div>
  );
}
