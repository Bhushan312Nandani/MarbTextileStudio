require("dotenv").config();
const prisma = require("../src/config/prisma");
const bcrypt = require("bcrypt");

async function main() {
  console.log("🌱 Starting Marb Studio database seed...");

  // 1. Categories
  const [hoodies, tees, jackets, bottoms, accessories, bundles] = await Promise.all([
    prisma.categories.upsert({
      where: { name: "Hoodies" },
      update: {},
      create: { name: "Hoodies", description: "Heavyweight abstract and signature hoodies" },
    }),
    prisma.categories.upsert({
      where: { name: "Tees" },
      update: {},
      create: { name: "Tees", description: "Precision-cut ring-spun cotton t-shirts" },
    }),
    prisma.categories.upsert({
      where: { name: "Jackets" },
      update: {},
      create: { name: "Jackets", description: "Technical editorial jackets and outwear" },
    }),
    prisma.categories.upsert({
      where: { name: "Bottoms" },
      update: {},
      create: { name: "Bottoms", description: "Technical tapered joggers and pants" },
    }),
    prisma.categories.upsert({
      where: { name: "Accessories" },
      update: {},
      create: { name: "Accessories", description: "Studio caps and essential accessories" },
    }),
    prisma.categories.upsert({
      where: { name: "Bundles" },
      update: {},
      create: { name: "Bundles", description: "Curated seasonal wardrobe collections" },
    }),
  ]);

  // 2. Brands
  const brand = await prisma.brands.upsert({
    where: { name: "Marb Studio" },
    update: {},
    create: {
      name: "Marb Studio",
      description: "Modern apparel from an artistic studio. Minimal. Forward-thinking.",
      logo_url: "/images/hero-bg.jpg",
    },
  });

  // 3. Users
  const adminPasswordHash = await bcrypt.hash("Admin@123", 10);
  const customerPasswordHash = await bcrypt.hash("Customer@123", 10);

  const admin = await prisma.users.upsert({
    where: { email: "admin@marbtextile.test" },
    update: { password_hash: adminPasswordHash },
    create: {
      first_name: "Marb",
      last_name: "Admin",
      email: "admin@marbtextile.test",
      password_hash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const customer = await prisma.users.upsert({
    where: { email: "customer@marbtextile.test" },
    update: { password_hash: customerPasswordHash },
    create: {
      first_name: "Ali",
      last_name: "Khan",
      email: "customer@marbtextile.test",
      password_hash: customerPasswordHash,
      role: "CUSTOMER",
    },
  });

  // 4. Customer Address & Cart
  await prisma.addresses.createMany({
    data: [
      {
        user_id: customer.id,
        address_line1: "House 42, Street 7, F-8/2",
        city: "Islamabad",
        postal_code: "44000",
        country: "Pakistan",
        is_default: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.carts.upsert({
    where: { user_id: customer.id },
    update: {},
    create: { user_id: customer.id },
  });

  // 5. Products Catalog
  const catalog = [
    {
      title: "Abstract Hood",
      description: "Minimal design. Maximum impact. Tailored for the modern individual. Crafted from heavyweight 450 GSM organic fleece with tonal abstract embroidery across the chest.",
      material: "100% Organic Cotton Fleece",
      gender: "Unisex",
      season: "Autumn/Winter",
      category_id: hoodies.id,
      image_url: "/images/product-hoodie.jpg",
      variants: [
        { sku: "MARB-HOOD-BLK-S", size: "S", color: "Midnight Black", price: 12900.0, stock_quantity: 25 },
        { sku: "MARB-HOOD-BLK-M", size: "M", color: "Midnight Black", price: 12900.0, stock_quantity: 40 },
        { sku: "MARB-HOOD-BLK-L", size: "L", color: "Midnight Black", price: 12900.0, stock_quantity: 30 },
        { sku: "MARB-HOOD-NVY-M", size: "M", color: "Studio Navy", price: 12900.0, stock_quantity: 20 },
      ],
    },
    {
      title: "Form Tee",
      description: "Precision-cut from 240 GSM ring-spun combed cotton. A clean structured silhouette with reinforced ribbing for the discerning wearer.",
      material: "100% Ring-Spun Cotton",
      gender: "Unisex",
      season: "All Season",
      category_id: tees.id,
      image_url: "/images/product-tee.jpg",
      variants: [
        { sku: "MARB-TEE-BLK-S", size: "S", color: "Midnight Black", price: 7900.0, stock_quantity: 50 },
        { sku: "MARB-TEE-BLK-M", size: "M", color: "Midnight Black", price: 7900.0, stock_quantity: 75 },
        { sku: "MARB-TEE-BLK-L", size: "L", color: "Midnight Black", price: 7900.0, stock_quantity: 45 },
      ],
    },
    {
      title: "Motion Jacket",
      description: "Technical fabric meets editorial design. Water-resistant matte ripstop exterior with breathable micro-mesh lining. Sealed zippers with utilitarian chest pockets.",
      material: "Matte Technical Poly-Nylon",
      gender: "Unisex",
      season: "All Season",
      category_id: jackets.id,
      image_url: "/images/product-jacket.jpg",
      variants: [
        { sku: "MARB-JCKT-DK-S", size: "S", color: "Carbon Grey", price: 18900.0, stock_quantity: 15 },
        { sku: "MARB-JCKT-DK-M", size: "M", color: "Carbon Grey", price: 18900.0, stock_quantity: 25 },
        { sku: "MARB-JCKT-DK-L", size: "L", color: "Carbon Grey", price: 18900.0, stock_quantity: 18 },
      ],
    },
    {
      title: "Studio Cap",
      description: "Structured six-panel low profile cap with subtle tonal logo embroidery. Premium wool blend with adjustable matte black brass clasp.",
      material: "Wool-Cotton Blend",
      gender: "Unisex",
      season: "All Season",
      category_id: accessories.id,
      image_url: "/images/product-cap.jpg",
      variants: [
        { sku: "MARB-CAP-BLK-OS", size: "OS", color: "Midnight Black", price: 4900.0, stock_quantity: 55 },
      ],
    },
    {
      title: "Motion Pant",
      description: "Technical jogger with precision tapered fit. Four-way stretch double-weave fabric with ergonomic knee articulation and concealed zipper pockets.",
      material: "Stretch Technical Nylon",
      gender: "Unisex",
      season: "All Season",
      category_id: bottoms.id,
      image_url: "/images/product-pant.jpg",
      variants: [
        { sku: "MARB-PNT-BLK-S", size: "S", color: "Midnight Black", price: 14900.0, stock_quantity: 12 },
        { sku: "MARB-PNT-BLK-M", size: "M", color: "Midnight Black", price: 14900.0, stock_quantity: 22 },
        { sku: "MARB-PNT-BLK-L", size: "L", color: "Midnight Black", price: 14900.0, stock_quantity: 15 },
      ],
    },
    {
      title: "Signature Hood",
      description: "Limited run. Abstract brushstroke artwork hand-applied by studio artists. Numbered studio edition on ultra-heavy Japanese cotton fleece.",
      material: "500 GSM Japanese Loopback Cotton",
      gender: "Unisex",
      season: "Autumn/Winter",
      category_id: hoodies.id,
      image_url: "/images/collection-signature.jpg",
      variants: [
        { sku: "MARB-SIG-HOOD-M", size: "M", color: "Indigo Abstract", price: 15900.0, stock_quantity: 8 },
        { sku: "MARB-SIG-HOOD-L", size: "L", color: "Indigo Abstract", price: 15900.0, stock_quantity: 10 },
      ],
    },
    {
      title: "Studio Essentials Set",
      description: "The complete studio foundation in a curated bundle. Includes the Signature Hood, Form Tee, and Studio Cap with custom gift packaging.",
      material: "Multi-fiber Set",
      gender: "Unisex",
      season: "All Season",
      category_id: bundles.id,
      image_url: "/images/collection-essentials.jpg",
      variants: [
        { sku: "MARB-BNDL-ESS-M", size: "M", color: "Obsidian Pack", price: 22900.0, stock_quantity: 14 },
        { sku: "MARB-BNDL-ESS-L", size: "L", color: "Obsidian Pack", price: 22900.0, stock_quantity: 16 },
      ],
    },
    {
      title: "Limited Edition Tee",
      description: "Abstract cosmic graphic screen-printed using water-based discharge inks on heavyweight raw cotton. Part of a numbered 200-piece studio drop.",
      material: "100% Raw Heavy Cotton",
      gender: "Unisex",
      season: "Summer",
      category_id: tees.id,
      image_url: "/images/collection-limited.jpg",
      variants: [
        { sku: "MARB-LTD-TEE-M", size: "M", color: "Deep Violet", price: 11900.0, stock_quantity: 12 },
        { sku: "MARB-LTD-TEE-L", size: "L", color: "Deep Violet", price: 11900.0, stock_quantity: 15 },
      ],
    },
  ];

  for (const item of catalog) {
    const existing = await prisma.products.findFirst({ where: { title: item.title } });
    if (!existing) {
      const created = await prisma.products.create({
        data: {
          title: item.title,
          description: item.description,
          material: item.material,
          gender: item.gender,
          season: item.season,
          category_id: item.category_id,
          brand_id: brand.id,
          seller_id: admin.id,
          product_images: {
            create: [{ image_url: item.image_url, is_primary: true }],
          },
          product_variants: {
            create: item.variants,
          },
        },
      });

      // Add a couple of initial verified reviews
      await prisma.reviews.create({
        data: {
          product_id: created.id,
          user_id: customer.id,
          rating: 5,
          review_text: "Incredible quality and weight of the fabric. The fit is modern, structured and comfortable.",
          is_verified_purchase: true,
        },
      });
    }
  }

  // 6. Coupons
  await prisma.coupons.upsert({
    where: { code: "MARB10" },
    update: {},
    create: {
      code: "MARB10",
      discount_percent: 10.0,
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      is_active: true,
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("👥 Users created:");
  console.log("   Admin:    admin@marbtextile.test / Admin@123");
  console.log("   Customer: customer@marbtextile.test / Customer@123");
  console.log("🎁 Active Coupon: MARB10 (10% off)");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
