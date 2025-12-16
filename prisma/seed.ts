import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Madu Hutan Murni',
    description: 'Madu hutan asli 100% murni tanpa campuran. Kaya akan antioksidan dan nutrisi alami untuk meningkatkan daya tahan tubuh.',
    price: 85000,
    stock: 50,
    weight: 500,
    image: '/images/madu-hutan.jpg',
    rating: 4.8,
  },
  {
    name: 'Jahe Merah Bubuk',
    description: 'Bubuk jahe merah organik berkualitas tinggi. Membantu menghangatkan tubuh dan meredakan masuk angin.',
    price: 35000,
    stock: 100,
    weight: 250,
    image: '/images/jahe-merah.jpg',
    rating: 4.6,
  },
  {
    name: 'Temulawak Kapsul',
    description: 'Kapsul temulawak untuk menjaga kesehatan hati dan meningkatkan nafsu makan. Isi 60 kapsul.',
    price: 45000,
    stock: 75,
    weight: 100,
    image: '/images/temulawak.jpg',
    rating: 4.5,
  },
  {
    name: 'Minyak Kutus Kutus',
    description: 'Minyak herbal tradisional Bali untuk pijat dan relaksasi. Membantu meredakan pegal-pegal dan nyeri otot.',
    price: 230000,
    stock: 30,
    weight: 100,
    image: '/images/kutus-kutus.jpg',
    rating: 4.9,
  },
  {
    name: 'Kunyit Asam Sachet',
    description: 'Minuman tradisional kunyit asam dalam bentuk sachet praktis. Menyegarkan dan baik untuk kesehatan wanita.',
    price: 25000,
    stock: 200,
    weight: 300,
    image: '/images/kunyit-asam.jpg',
    rating: 4.4,
  },
  {
    name: 'Habatussauda Kapsul',
    description: 'Kapsul jintan hitam (habbatussauda) untuk meningkatkan sistem imun tubuh. Isi 100 kapsul.',
    price: 65000,
    stock: 80,
    weight: 150,
    image: '/images/habatussauda.jpg',
    rating: 4.7,
  },
  {
    name: 'Teh Daun Sirsak',
    description: 'Teh herbal dari daun sirsak kering. Dipercaya membantu menjaga kesehatan dan kaya antioksidan.',
    price: 28000,
    stock: 120,
    weight: 100,
    image: '/images/teh-sirsak.jpg',
    rating: 4.3,
  },
  {
    name: 'Propolis Brazil',
    description: 'Propolis asli Brazil dengan kualitas premium. Membantu meningkatkan daya tahan tubuh dan antibakteri alami.',
    price: 175000,
    stock: 40,
    weight: 30,
    image: '/images/propolis.jpg',
    rating: 4.8,
  },
];

async function main() {
  console.log('🌿 Seeding database dengan produk herbal...');

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, '-'),
        ...product,
      },
    });
    console.log(`✅ Created product: ${created.name}`);
  }

  console.log('🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
