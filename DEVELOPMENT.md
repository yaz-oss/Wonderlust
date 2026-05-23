# Wonderlust - Development Guide

## Quick Start

### Option 1: Automated Setup (Windows)
```bash
setup.bat
```

### Option 2: Automated Setup (Linux/Mac)
```bash
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup

#### 1. Create Environment Files
```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

#### 2. Edit Environment Variables
Edit `frontend/.env.local` and `backend/.env` with your API keys:
- Google OAuth credentials
- OpenAI API key
- Cloudinary credentials
- JWT secret
- Database URL (PostgreSQL)

#### 3. Start PostgreSQL
```bash
docker-compose up -d
```

#### 4. Install Dependencies
```bash
cd frontend && npm install --legacy-peer-deps
cd ../backend && npm install --legacy-peer-deps
```

#### 5. Setup Database
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

#### 6. Start Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
# Opens on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run built version
- `npx prisma studio` - Open database UI

## Database Management

### Prisma Commands
```bash
# Create new migration
npx prisma migrate dev --name feature_name

# View database in UI
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database with sample data
npx prisma db seed
```

## API Documentation

### Authentication
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Google OAuth: `GET /api/auth/google/callback`

### Users
- Get Profile: `GET /api/users/:id`
- Update Profile: `PUT /api/users/profile`
- Follow User: `POST /api/users/:id/follow`

### Posts
- Get All: `GET /api/posts?page=1&limit=10`
- Create: `POST /api/posts`
- Get One: `GET /api/posts/:id`
- Delete: `DELETE /api/posts/:id`
- Like: `POST /api/posts/:id/like`
- Comment: `POST /api/posts/:id/comment`

### Destinations
- Get All: `GET /api/destinations?country=France&category=city`
- Get One: `GET /api/destinations/:id`
- Get Trending: `GET /api/destinations/trending`

### Trip Planner
- Generate Plan: `POST /api/trip-planner/generate`
- Get Plans: `GET /api/trip-planner`

## Troubleshooting

### Dependencies Installation Issues
```bash
npm install --legacy-peer-deps --force
```

### Database Connection Issues
- Check Docker is running: `docker ps`
- Check .env file has correct DATABASE_URL
- Verify PostgreSQL container is healthy

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Reset migrations
npx prisma migrate reset
```

## Project Structure

```
wonderlust/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # State management (Zustand)
│   │   ├── types/        # TypeScript types
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utility functions
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/               # Express backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Entry point
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.ts       # Seed script
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml     # PostgreSQL setup
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/feature-name
```

## Performance Tips

1. **Frontend:**
   - Use React.memo for expensive components
   - Implement code splitting with React.lazy
   - Optimize images with Cloudinary transformations
   - Use Framer Motion for smooth animations

2. **Backend:**
   - Use database indexes (already in schema)
   - Implement pagination for large queries
   - Cache frequently accessed data
   - Use connection pooling for database

3. **Database:**
   - Run regular migrations
   - Monitor slow queries
   - Backup regularly
   - Use indexes effectively

## Security Best Practices

1. **Frontend:**
   - Store JWT in secure HTTP-only cookies
   - Implement CORS properly
   - Validate all user inputs
   - Use HTTPS in production

2. **Backend:**
   - Use environment variables for secrets
   - Validate all inputs server-side
   - Implement rate limiting
   - Use HTTPS and SSL/TLS

3. **Database:**
   - Use strong passwords
   - Enable SSL connections
   - Regular backups
   - Limit database access

## Support & Resources

- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **Prisma Docs:** https://www.prisma.io/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs
