@echo off
REM Wonderlust Project Setup Script for Windows

echo 🌍 Setting up Wonderlust...

REM Create .env files
echo 📝 Creating environment files...
copy frontend\.env.example frontend\.env.local
copy backend\.env.example backend\.env

REM Install dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install --legacy-peer-deps
cd ..

echo 📦 Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps
cd ..

REM Setup database
echo 🗄️ Starting PostgreSQL with Docker...
docker-compose up -d

REM Generate Prisma client
echo 🔧 Generating Prisma client...
cd backend
call npx prisma generate
call npx prisma migrate dev --name init
call npx prisma db seed
cd ..

echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo   Frontend: cd frontend ^&& npm run dev
echo   Backend:  cd backend ^&& npm run dev
echo.
echo 📖 Documentation: See README.md and DEPLOYMENT.md
pause
