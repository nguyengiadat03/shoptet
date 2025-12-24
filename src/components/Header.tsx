import Link from "next/link";
import { getCartItemCount } from "@/lib/cart-actions";
import HeaderClient from "./HeaderClient";

const menuItems = [
  { name: "Quà tết Doanh Nghiệp", href: "/danh-muc/qua-tet-doanh-nghiep" },
  { name: "Quà tết Đối Tác", href: "/danh-muc/qua-tet-doi-tac" },
  { name: "Quà tết Sếp", href: "/danh-muc/qua-tet-sep" },
  { name: "Quà tết Nhân Viên", href: "/danh-muc/qua-tet-nhan-vien" },
  { name: "Quà tết Bố Mẹ", href: "/danh-muc/qua-tet-bo-me" },
  {
    name: "Set theo giá",
    href: "#",
    dropdown: [
      { name: "Dưới 500.000đ", href: "/danh-muc/gio-qua-tet?price=duoi-500k" },
      { name: "500.000đ - 1.000.000đ", href: "/danh-muc/gio-qua-tet?price=500k-1trieu" },
      { name: "1.000.000đ - 2.000.000đ", href: "/danh-muc/gio-qua-tet?price=1-2trieu" },
      { name: "Trên 2.000.000đ", href: "/danh-muc/gio-qua-tet?price=tren-2trieu" },
    ],
  },
  {
    name: "Set theo loại",
    href: "#",
    dropdown: [
      { name: "Giỏ quà Tết", href: "/danh-muc/gio-qua-tet" },
      { name: "Hộp quà Tết", href: "/danh-muc/hop-qua-tet" },
      { name: "Khay mứt Tết", href: "/danh-muc/khay-mut" },
    ],
  },
  { name: "Khay mứt", href: "/danh-muc/khay-mut" },
  { name: "Liên hệ", href: "/lien-he" },
];

export default async function Header() {
  const cartCount = await getCartItemCount();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="header-top py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-white text-2xl font-bold">Shop</span>
            <span className="text-[#f6c453] text-2xl font-bold">quatet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div key={item.name} className="dropdown">
                <Link
                  href={item.href}
                  className="nav-link flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && (
                    <svg
                      className="w-3 h-3"
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
          <div className="flex items-center gap-4">
            {/* Search */}
            <Link
              href="/tim-kiem"
              className="text-white hover:opacity-80 transition"
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
              className="relative text-white hover:opacity-80 transition"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f6c453] text-[#b71c1c] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <HeaderClient menuItems={menuItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
