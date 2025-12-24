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
        className="lg:hidden text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
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
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 bg-[#b71c1c] flex items-center justify-between">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            className="text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
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
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-60px)]">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100">
              {item.dropdown ? (
                <>
                  <button
                    className="w-full py-3 px-2 flex items-center justify-between text-gray-800 font-medium"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
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
                  {openDropdown === item.name && (
                    <div className="pl-4 pb-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 px-2 text-gray-600 hover:text-[#b71c1c]"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 px-2 text-gray-800 font-medium hover:text-[#b71c1c]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
