import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TetAnimation from "@/components/TetAnimation";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shop Quà Tết Việt - Giỏ quà Tết, Hộp quà Tết, Khay mứt Tết 2026",
    template: "%s | Shop Quà Tết Việt",
  },
  description:
    "Shop Quà Tết Việt - Chuyên cung cấp giỏ quà Tết, hộp quà Tết, khay mứt Tết cao cấp 2026. Quà tặng doanh nghiệp, đối tác, sếp, nhân viên, bố mẹ. Giao hàng toàn quốc.",
  keywords: [
    "quà tết",
    "giỏ quà tết",
    "hộp quà tết",
    "khay mứt tết",
    "quà tết doanh nghiệp",
    "quà tết 2026",
    "quà tết bính ngọ",
    "set quà tết",
    "quà tặng tết",
  ],
  authors: [{ name: "Shop Quà Tết Việt" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Shop Quà Tết Việt",
    title: "Shop Quà Tết Việt - Giỏ quà Tết, Hộp quà Tết, Khay mứt Tết 2026",
    description:
      "Chuyên cung cấp giỏ quà Tết, hộp quà Tết, khay mứt Tết cao cấp 2026. Giao hàng toàn quốc.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shop Quà Tết Việt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Quà Tết Việt - Giỏ quà Tết 2026",
    description:
      "Chuyên cung cấp giỏ quà Tết, hộp quà Tết, khay mứt Tết cao cấp 2026.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable} ${playfair.variable}`}>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shop Quà Tết Việt",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84-934-022-424",
                contactType: "customer service",
                availableLanguage: "Vietnamese",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "15 Đường số 2, khu đô thị Vạn Phúc, Phường Hiệp Bình",
                addressLocality: "TP Hồ Chí Minh",
                addressCountry: "VN",
              },
              sameAs: [
                "https://facebook.com/shopquatetvivu",
                "https://zalo.me/0934022424",
              ],
            }),
          }}
        />
      </head>
      <body className={roboto.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <TetAnimation />
      </body>
    </html>
  );
}
