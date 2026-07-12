const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

/**
 * Owner: Member 1 (Database Architect)
 * Run with: npx prisma db seed
 * Safe to re-run — categories/brands/users use upsert (idempotent by unique
 * field), products only get created once (guarded by a count check).
 */
async function main() {
  const [tshirts, jeans] = await Promise.all([
    prisma.categories.upsert({
      where: { name: "T-Shirts" },
      update: {},
      create: { name: "T-Shirts", description: "Casual and graphic tees" },
    }),
    prisma.categories.upsert({
      where: { name: "Jeans" },
      update: {},
      create: { name: "Jeans", description: "Denim jeans, all fits" },
    }),
  ]);

  const brand = await prisma.brands.upsert({
    where: { name: "Marb Essentials" },
    update: {},
    create: { name: "Marb Essentials", description: "In-house label" },
  });

  const admin = await prisma.users.upsert({
    where: { email: "admin@marbtextile.test" },
    update: {},
    create: {
      first_name: "Store",
      last_name: "Admin",
      email: "admin@marbtextile.test",
      password_hash: await bcrypt.hash("Admin@123", 10),
      role: "ADMIN",
    },
  });

  await prisma.users.upsert({
    where: { email: "customer@marbtextile.test" },
    update: {},
    create: {
      first_name: "Test",
      last_name: "Customer",
      email: "customer@marbtextile.test",
      password_hash: await bcrypt.hash("Customer@123", 10),
      role: "CUSTOMER",
    },
  });

  const productCount = await prisma.products.count();
  if (productCount === 0) {
    await prisma.products.create({
      data: {
        title: "Classic Crew Neck T-Shirt",
        description: "100% cotton, breathable everyday tee.",
        material: "Cotton",
        gender: "Unisex",
        season: "All Season",
        category_id: tshirts.id,
        brand_id: brand.id,
        seller_id: admin.id,
        product_images: {
          create: [{ image_url: "https://placehold.co/600x800?text=Crew+Neck+Tee", is_primary: true }],
        },
        product_variants: {
          create: [
            { sku: "TSHIRT-CREW-BLK-S", size: "S", color: "Black", stock_quantity: 25, price: 1499.0 },
            { sku: "TSHIRT-CREW-BLK-M", size: "M", color: "Black", stock_quantity: 30, price: 1499.0 },
            { sku: "TSHIRT-CREW-WHT-M", size: "M", color: "White", stock_quantity: 20, price: 1499.0 },
          ],
        },
      },
    });

    await prisma.products.create({
      data: {
        title: "Slim Fit Denim Jeans",
        description: "Stretch denim, slim fit, mid-rise.",
        material: "Denim",
        gender: "Men",
        season: "All Season",
        category_id: jeans.id,
        brand_id: brand.id,
        seller_id: admin.id,
        product_images: {
          create: [{ image_url: "https://placehold.co/600x800?text=Slim+Fit+Jeans", is_primary: true }],
        },
        product_variants: {
          create: [
            { sku: "JEANS-SLIM-BLU-32", size: "32", color: "Blue", stock_quantity: 15, price: 3499.0 },
            { sku: "JEANS-SLIM-BLU-34", size: "34", color: "Blue", stock_quantity: 18, price: 3499.0 },
          ],
        },
      },
    });

    console.log("Seeded 2 categories, 1 brand, 2 products with variants.");
  } else {
    console.log(`Skipped product seeding — ${productCount} product(s) already exist.`);
  }

  console.log("Seeded users:");
  console.log("  admin@marbtextile.test / Admin@123");
  console.log("  customer@marbtextile.test / Customer@123");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
