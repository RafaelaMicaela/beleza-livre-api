#!/usr/bin/env node

/**
 * Database Seeding Script
 * Populates the database with sample vegan cosmetics data
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "Batom Vegano Rosé Natural",
    description: "Batom cremoso feito com ingredientes 100% naturais e veganos. Cor rosé suave para o dia a dia.",
    price: 29.90,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    stock: 50,
    rating: 4.8
  },
  {
    name: "Base Líquida Cobertura Natural",
    description: "Base vegana com cobertura natural e textura leve. Disponível em várias tonalidades.",
    price: 45.50,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    stock: 30,
    rating: 4.6
  },
  {
    name: "Máscara de Cílios Volume Extremo",
    description: "Máscara vegana que proporciona volume e alongamento natural dos cílios.",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400",
    stock: 40,
    rating: 4.9
  },
  {
    name: "Paleta de Sombras Tons Terrosos",
    description: "Paleta com 12 cores veganas em tons terrosos para looks naturais e sofisticados.",
    price: 89.90,
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400",
    stock: 25,
    rating: 4.7
  },
  {
    name: "Hidratante Facial Vegano",
    description: "Hidratante facial com ácido hialurônico e ingredientes naturais. Livre de crueldade animal.",
    price: 52.00,
    imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 60,
    rating: 4.8
  },
  {
    name: "Esmalte Vegano Verde Menta",
    description: "Esmalte vegano de longa duração na cor verde menta. Fórmula livre de tolueno e formaldeído.",
    price: 18.90,
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400",
    stock: 80,
    rating: 4.5
  },
  {
    name: "Sérum Facial Anti-idade",
    description: "Sérum concentrado com vitamina C e ingredientes naturais para combater sinais de envelhecimento.",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
    stock: 35,
    rating: 4.9
  },
  {
    name: "Protetor Solar Facial FPS 60",
    description: "Protetor solar facial vegano com FPS 60. Base aquosa e de rápida absorção.",
    price: 42.50,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 45,
    rating: 4.6
  }
];

const sampleUsers = [
  {
    name: "Ana Silva",
    email: "ana.silva@example.com",
    password: "senha123" // Em produção, usar hash
  },
  {
    name: "Maria Santos",
    email: "maria.santos@example.com", 
    password: "senha123"
  },
  {
    name: "Carla Oliveira",
    email: "carla.oliveira@example.com",
    password: "senha123"
  }
];

async function seedDatabase() {
  console.log('🌱 Iniciando seeding da database...');
  
  try {
    // Clear existing data (optional)
    console.log('🧹 Limpando dados existentes...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // Seed Users
    console.log('👥 Criando usuários...');
    const users = await prisma.user.createMany({
      data: sampleUsers,
      skipDuplicates: true
    });
    console.log(`✅ ${users.count} usuários criados`);

    // Seed Products
    console.log('🛍️ Criando produtos...');
    const products = await prisma.product.createMany({
      data: sampleProducts,
      skipDuplicates: true
    });
    console.log(`✅ ${products.count} produtos criados`);

    // Create sample carts and orders
    console.log('🛒 Criando carrinho de exemplo...');
    const firstUser = await prisma.user.findFirst();
    const firstProduct = await prisma.product.findFirst();
    
    if (firstUser && firstProduct) {
      const cart = await prisma.cart.create({
        data: {
          userId: firstUser.id,
          items: {
            create: {
              productId: firstProduct.id,
              quantity: 2
            }
          }
        }
      });
      console.log(`✅ Carrinho criado para usuário ${firstUser.name}`);

      // Create sample order
      const order = await prisma.order.create({
        data: {
          userId: firstUser.id,
          total: firstProduct.price * 2,
          status: 'completed',
          items: {
            create: {
              productId: firstProduct.id,
              quantity: 2,
              price: firstProduct.price
            }
          }
        }
      });
      console.log(`✅ Pedido de exemplo criado`);
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📊 Database summary:');
    
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.cart.count()
    ]);
    
    console.log(`- Users: ${counts[0]}`);
    console.log(`- Products: ${counts[1]}`);
    console.log(`- Orders: ${counts[2]}`);
    console.log(`- Carts: ${counts[3]}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

// Run seeding
if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { seedDatabase, sampleProducts, sampleUsers };