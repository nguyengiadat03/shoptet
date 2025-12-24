import Link from "next/link";
import { getCartItemCount } from "@/lib/cart-actions";
import HeaderClient from "./HeaderClient";

const menuItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Quà tết Doanh Nghiệp", href: "/danh-muc/qua-tet-doanh-nghiep" },
  { name: "Quà tết Đối Tác", href: "/danh-muc/qua-tet-doi-tac" },
  { name: "Quà tết Sếp", href: "/danh-muc/qua-tet-sep" },
  { name: "Quà tết Bố Mẹ", href: "/danh-muc/qua-tet-bo-me" },
  {
    name: "Giỏ quà theo giá",
    href: "#",
    dropdown: [
      { name: "Dưới 500.000đ", href: "/danh-muc/gio-qua-tet?price=duoi-500k" },
      {
        name: "500.000đ - 1.000.000đ",
        href: "/danh-muc/gio-qua-tet?price=500k-1trieu",
      },
      {
        name: "1.000.000đ - 2.000.000đ",
        href: "/danh-muc/gio-qua-tet?price=1-2trieu",
      },
      {
        name: "Trên 2.000.000đ",
        href: "/danh-muc/gio-qua-tet?price=tren-2trieu",
      },
    ],
  },
  {
    name: "Loại quà Tết",
    href: "#",
    dropdown: [
      { name: "🧺 Giỏ quà Tết", href: "/danh-muc/gio-qua-tet" },
      { name: "📦 Hộp quà Tết", href: "/danh-muc/hop-qua-tet" },
      { name: "🍬 Khay mứt Tết", href: "/danh-muc/khay-mut" },
    ],
  },
  { name: "Khay mứt", href: "/danh-muc/khay-mut" },
  { name: "Liên hệ", href: "/lien-he" },
];

export default async function Header() {
  const cartCount = await getCartItemCount();

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Promo Bar */}
      <div className="promo-banner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="animate-pulse">🎊</span>
          <span className="font-medium">
            Tết Bính Ngọ 2026 - Giảm đến 30% tất cả Giỏ quà Tết | Giao hàng toàn
            quốc
          </span>
          <span className="animate-pulse">🎊</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <div className="relative">
                <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  Shop
                </span>
                <span className="text-3xl md:text-4xl font-bold text-[#ffd700] drop-shadow-lg">
                  tet
                </span>
                <span className="absolute -top-2 -right-6 text-xs bg-[#ffd700] text-[#8b0000] px-2 py-0.5 rounded-full font-bold">
                  2026
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {menuItems.map((item) => (
                <div key={item.name} className="dropdown">
                  <Link
                    href={item.href}
                    className="nav-link flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg
                        className="w-3 h-3 opacity-70"
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
                    )}
                  </Link>
                  {item.dropdown && (
                    <div className="dropdown-menu">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="dropdown-item"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Hotline */}
              <a
                href="tel:0934022424"
                className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition"
              >
                <svg
                  className="w-4 h-4 text-[#ffd700]"
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
                <span className="text-sm font-semibold">0934 022 424</span>
              </a>

              {/* Search */}
              <Link
                href="/tim-kiem"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/gio-hang"
                className="relative w-10 h-10 flex items-center justify-center bg-[#ffd700] rounded-full text-[#8b0000] hover:bg-[#ffec8b] transition shadow-lg"
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c41e3a] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <HeaderClient menuItems={menuItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
