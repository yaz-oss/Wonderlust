#!/bin/bash

# Wonderlust Project Setup Script

echo "🌍 Setting up Wonderlust..."

# Create .env files
echo "📝 Creating environment files..."
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps
cd ..

echo "📦 Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps
cd ..

# Setup database
echo "🗄️ Setting up PostgreSQL..."
docker-compose up -d

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
cd ..

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "  Frontend: cd frontend && npm run dev"
echo "  Backend:  cd backend && npm run dev"
echo ""
echo "📖 Documentation: See README.md and DEPLOYMENT.md"
