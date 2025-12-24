/**
 * Format số tiền VND
 */
export function formatVND(amount: number): string {
    return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}

/**
 * Format giá với giá gốc và giá sale
 */
export function formatPrice(price: number, salePrice?: number | null) {
    if (salePrice && salePrice < price) {
        return {
            original: formatVND(price),
            sale: formatVND(salePrice),
            hasDiscount: true,
        };
    }
    return {
        original: formatVND(price),
        sale: null,
        hasDiscount: false,
    };
}

/**
 * Tính phần trăm giảm giá
 */
export function calculateDiscount(price: number, salePrice: number): number {
    return Math.round(((price - salePrice) / price) * 100);
}

/**
 * Tạo slug từ string
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

/**
 * Tạo mã đơn hàng
 */
export function generateOrderCode(): string {
    const prefix = "DH";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
}

/**
 * Parse JSON an toàn
 */
export function safeParseJSON<T>(str: string, fallback: T): T {
    try {
        return JSON.parse(str);
    } catch {
        return fallback;
    }
}

/**
 * Truncate text
 */
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
}

/**
 * Class names helper
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}
