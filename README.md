# Shop Quà Tết Việt - Next.js Ecommerce

Website ecommerce bán sản phẩm Tết (Giỏ quà Tết, hộp quà, khay mứt) được xây dựng với Next.js 14 App Router, TypeScript, TailwindCSS và Prisma ORM.

## 🎯 Features

- ✅ **Next.js 14 App Router** với Server Components
- ✅ **TypeScript** cho type safety
- ✅ **TailwindCSS** với design tokens Tết 2026
- ✅ **Prisma ORM** (SQLite dev, MySQL-ready)
- ✅ **Server Actions** cho cart & checkout
- ✅ **SEO Optimized** với metadata, OG tags, Schema.org
- ✅ **Responsive Design** (mobile-first)
- ✅ **Tết Animations** (hoa mai/đào rơi)
- ✅ **ISR Caching** cho performance

## 📁 Project Structure

```
shoptet/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Seed data
│   └── migrations/            # Migration files
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── danh-muc/[slug]/  # Category pages
│   │   ├── san-pham/[slug]/  # Product pages
│   │   ├── gio-hang/          # Cart page
│   │   ├── thanh-toan/        # Checkout page
│   │   ├── don-hang/[code]/  # Order success page
│   │   ├── tim-kiem/          # Search page
│   │   ├── lien-he/           # Contact page
│   │   ├── chinh-sach/        # Policy pages
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   ├── robots.ts          # Robots.txt
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── TetAnimation.tsx
│   │   └── ...
│   └── lib/                   # Utilities & actions
│       ├── db.ts              # Prisma client
│       ├── utils.ts           # Helper functions
│       ├── cart-actions.ts    # Cart server actions
│       ├── order-actions.ts   # Order server actions
│       └── contact-actions.ts # Contact form actions
├── .env                       # Environment variables
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── prisma.config.ts           # Prisma 7 config
└── package.json
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed database (optional - có thể seed manual sau)
npm run db:seed
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Models:
- **Category** - Danh mục sản phẩm
- **Product** - Sản phẩm quà Tết
- **Cart** & **CartItem** - Giỏ hàng
- **Order** & **OrderItem** - Đơn hàng
- **Testimonial** - Đánh giá khách hàng
- **ContactForm** - Form liên hệ
- **Setting** - Cấu hình website

## 🔄 Switching to MySQL (Production)

### 1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"  // Change from "sqlite" to "mysql"
}
```

### 2. Update `prisma.config.ts`:

```typescript
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],  // Point to MySQL connection string
  },
});
```

### 3. Update `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/shoptet?charset=utf8mb4&collation=utf8mb4_unicode_ci"
```

### 4. Run migrations:

```bash
npm run db:push
# or
npm run db:migrate
```

## 🎨 Design Tokens

Tất cả design tokens được định nghĩa trong `src/app/globals.css`:

- **Primary Red**: `#b71c1c` (Đỏ Tết)
- **Accent Gold**: `#f6c453` (Vàng gold)
- **Cream Background**: `#f6e3c5`
- **Border Orange**: `#f2c18d`

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database scripts
npm run db:migrate   # Run Prisma migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database
```

## 🌐 Deployment

### Docker Deployment

```bash
docker build -t shoptet .
docker run -p 3000:3000 shoptet
```

### Vercel/Netlify

1. Connect your Git repository
2. Set environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy!

## 📄 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/danh-muc/[slug]` | Category listing |
| `/san-pham/[slug]` | Product detail |
| `/gio-hang` | Shopping cart |
| `/thanh-toan` | Checkout |
| `/don-hang/[code]` | Order success |
| `/tim-kiem` | Search |
| `/lien-he` | Contact |
| `/chinh-sach/*` | Policy pages |

## 🎯 SEO Features

- ✅ Dynamic metadata per page
- ✅ Open Graph tags
- ✅ Schema.org JSON-LD (Product, BreadcrumbList, Organization)
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ ISR for static pages

## 🎨 Tết 2026 Animations

- Hoa mai/đào rơi nhẹ (CSS keyframes)
- Shimmer effect trên CTA buttons
- Respects `prefers-reduced-motion`
- Auto-disabled trên mobile để tối ưu performance

## 📞 Support

For questions or issues, contact:
- Email: info@shopquatetvivu.com
- Phone: 0934 022 424

## 📝 License

Private - All rights reserved

---

**Built with ❤️ for Tết Bính Ngọ 2026**
