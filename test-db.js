// Test Prisma connection
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log("🔍 Testing Prisma connection...");

        // Test connection
        await prisma.$connect();
        console.log("✅ Database connected successfully!");

        // Count records
        const categoryCount = await prisma.category.count();
        const productCount = await prisma.product.count();

        console.log(`📊 Categories: ${categoryCount}`);
        console.log(`📊 Products: ${productCount}`);

        if (categoryCount === 0) {
            console.log("\n⚠️  Database is empty. Run seed to populate data:");
            console.log("   npm run db:studio");
            console.log("   Or manually create categories and products");
        }

    } catch (error) {
        console.error("❌ Database connection failed:");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
