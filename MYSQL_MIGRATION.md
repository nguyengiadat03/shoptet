# MySQL Migration Guide

Hướng dẫn chuyển từ SQLite (development) sang MySQL (production)

## Bước 1: Chuẩn bị MySQL Database

### Tạo database mới:

```sql
CREATE DATABASE shoptet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Tạo user và grant quyền:

```sql
CREATE USER 'shoptet_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON shoptet.* TO 'shoptet_user'@'localhost';
FLUSH PRIVILEGES;
```

## Bước 2: Update Prisma Schema

### File: `prisma/schema.prisma`

Thay đổi datasource từ:

```prisma
datasource db {
  provider = "sqlite"
}
```

Thành:

```prisma
datasource db {
  provider = "mysql"
}
```

## Bước 3: Update Database URL

### File: `prisma.config.ts`

Đảm bảo datasource URL đúng:

```typescript
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### File: `.env`

Thay đổi DATABASE_URL:

```env
# Development (SQLite)
# DATABASE_URL="file:./dev.db"

# Production (MySQL)
DATABASE_URL="mysql://shoptet_user:your_password@localhost:3306/shoptet?charset=utf8mb4&collation=utf8mb4_unicode_ci"
```

## Bước 4: Run Migrations

### Option 1: Migrate từ đầu (Recommended cho production mới)

```bash
# Xóa folder migrations cũ (nếu cần)
rm -rf prisma/migrations

# Tạo migration mới cho MySQL
npx prisma migrate dev --name init_mysql

# Seed data
npm run db:seed
```

### Option 2: Push schema trực tiếp (Nhanh hơn cho testing)

```bash
npx prisma db push
npm run db:seed
```

## Bước 5: Verify Migration

```bash
# Mở Prisma Studio để kiểm tra
npm run db:studio
```

## Lưu ý quan trọng

### 1. Charset & Collation

MySQL cần charset và collation đúng để hỗ trợ tiếng Việt:

```
charset=utf8mb4
collation=utf8mb4_unicode_ci
```

### 2. Timezone

Thêm timezone vào connection string nếu cần:

```
DATABASE_URL="mysql://user:pass@localhost:3306/shoptet?charset=utf8mb4&timezone=Asia/Ho_Chi_Minh"
```

### 3. Connection Pool

Cho production, nên config connection pool:

```typescript
// src/lib/db.ts
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
});
```

### 4. Backup Data

Trước khi migrate, backup data từ SQLite:

```bash
# Export data từ SQLite
npx prisma db pull
```

## Troubleshooting

### Lỗi: "Can't connect to MySQL server"

- Kiểm tra MySQL service đang chạy
- Kiểm tra firewall
- Kiểm tra username/password

### Lỗi: "Access denied for user"

- Kiểm tra GRANT privileges
- Kiểm tra password trong .env

### Lỗi: "Unknown database"

- Tạo database trước: `CREATE DATABASE shoptet;`

### Lỗi charset

- Đảm bảo database được tạo với utf8mb4
- Thêm `?charset=utf8mb4` vào connection string

## Production Deployment Checklist

- [ ] Tạo MySQL database
- [ ] Update `prisma/schema.prisma` provider sang "mysql"
- [ ] Update `.env` với MySQL connection string
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed data (nếu cần): `npm run db:seed`
- [ ] Test kết nối: `npx prisma db pull`
- [ ] Verify data: `npm run db:studio`
- [ ] Deploy application
- [ ] Monitor logs

## Performance Tips

### 1. Indexes

Thêm indexes cho các trường thường query:

```prisma
model Product {
  // ...
  @@index([slug])
  @@index([categoryId])
  @@index([isActive, isFeatured])
}
```

### 2. Connection Pooling

Sử dụng connection pooling cho production:

```env
DATABASE_URL="mysql://user:pass@localhost:3306/shoptet?connection_limit=10&pool_timeout=20"
```

### 3. Query Optimization

- Sử dụng `select` để chỉ lấy fields cần thiết
- Sử dụng `include` thay vì multiple queries
- Enable query logging để monitor slow queries

---

**Lưu ý**: File này chỉ là hướng dẫn. Thực tế có thể khác tùy vào môi trường hosting của bạn.
