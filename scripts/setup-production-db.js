#!/usr/bin/env node

/**
 * Production Database Setup Script
 * This script helps set up and validate the production database connection
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function setupProductionDatabase() {
  console.log('🗄️  Production Database Setup Script');
  console.log('=====================================\n');

  // Check if production DATABASE_URL is set
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Please set DATABASE_URL in your .env file');
    console.log('Example: DATABASE_URL=postgresql://user:password@host:5432/database');
    process.exit(1);
  }

  console.log('✅ DATABASE_URL found');
  console.log(`📍 Host: ${dbUrl.split('@')[1]?.split('/')[0] || 'localhost'}`);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl
      }
    }
  });

  try {
    console.log('\n🔍 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');

    // Check if tables exist
    console.log('\n📋 Checking database schema...');
    
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ Schema exists - Users table found (${userCount} records)`);
      
      const productCount = await prisma.product.count();
      console.log(`✅ Products table found (${productCount} records)`);
      
    } catch (error) {
      if (error.code === 'P2021') {
        console.log('⚠️  Tables not found - you may need to run migrations');
        console.log('Run: npx prisma migrate deploy');
      } else {
        console.log('⚠️  Schema check failed:', error.message);
      }
    }

    // Test basic operations
    console.log('\n🧪 Testing basic operations...');
    
    try {
      // Try to create and delete a test record
      const testUser = await prisma.user.create({
        data: {
          name: 'Test User',
          email: `test-${Date.now()}@example.com`,
          password: 'test123'
        }
      });
      
      console.log('✅ Create operation successful');
      
      // Clean up test record
      await prisma.user.delete({
        where: { id: testUser.id }
      });
      
      console.log('✅ Delete operation successful');
      
    } catch (error) {
      console.log('⚠️  Basic operations test failed:', error.message);
    }

    console.log('\n✅ Database setup validation complete!');
    console.log('\n📋 Next steps:');
    console.log('1. If migrations are needed: npx prisma migrate deploy');
    console.log('2. Update Vercel environment variables');
    console.log('3. Deploy to Vercel');

  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('- Check if the database URL is correct');
      console.log('- Verify the database server is running');
      console.log('- Check firewall/network settings');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down...');
  process.exit(0);
});

// Run the setup
setupProductionDatabase().catch(console.error);