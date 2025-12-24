"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

interface HeaderClientProps {
  menuItems: MenuItem[];
}

export default function HeaderClient({ menuItems }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="xl:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`xl:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#c41e3a] to-[#8b0000] flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-white">Shop</span>
            <span className="text-xl font-bold text-[#ffd700]">quatet</span>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100">
              {item.dropdown ? (
                <>
                  <button
                    className="w-full py-4 px-3 flex items-center justify-between text-gray-700 font-medium hover:text-[#c41e3a] transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.name
                          ? "rotate-180 text-[#c41e3a]"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 pb-3 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2.5 px-3 text-gray-600 hover:text-[#c41e3a] hover:bg-[#fff8e7] rounded-lg transition text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-4 px-3 text-gray-700 font-medium hover:text-[#c41e3a] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-[#fff8e7] rounded-xl">
            <p className="text-sm font-semibold text-[#c41e3a] mb-3">
              Hotline đặt hàng:
            </p>
            <a
              href="tel:0934022424"
              className="flex items-center gap-2 text-lg font-bold text-[#c41e3a]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              0934 022 424
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
