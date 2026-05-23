# Wonderlust 🌍
**AI-powered Social Travel Discovery Platform**

A modern web application where users discover destinations, share travel experiences, interact socially, plan trips with AI, and save dream locations.

## Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database

### Authentication
- **JWT** - Token-based authentication
- **Google OAuth 2.0** - Social login

### External Services
- **Cloudinary** - Image storage
- **OpenAI** - AI trip planner
- **Neon** - PostgreSQL hosting (production)

## Project Structure

```
wonderlust/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business services
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml       # Docker setup for PostgreSQL
```

## Features

### 1. User Authentication 🔐
- Email/Password registration and login
- JWT token-based authentication
- Google OAuth login
- Secure password hashing with bcrypt

### 2. Explore Destinations 🌍
- Browse countries, cities, and trending places
- Filter by category (beach, mountain, adventure, etc.)
- Destination details with images and ratings

### 3. Social Travel Posts 📸
- Upload travel photos
- Add descriptions and tag locations
- Like and comment on posts
- Follow other travelers

### 4. AI Trip Planner 🤖
- Generate personalized itineraries
- Input: budget, duration, destination, trip type
- AI suggestions for activities and accommodations
- Uses OpenAI API

### 5. Save & Bookmark ⭐
- Save favorite destinations
- Create trip wishlists
- Organize saved places by category

### 6. User Profiles 👤
- Public profiles with bio
- Show user's posts and saved places
- Follower/following system
- Social interactions

### 7. Admin Dashboard 👑
- Manage users
- Delete inappropriate posts
- View platform statistics
- Generate reports

## Color Palette 🎨

| Element | Color |
|---------|-------|
| Background | #0B1020 |
| Secondary BG | #121A2F |
| Primary Accent | #7C4DFF |
| Cyan Accent | #00D4FF |
| Text | #F5F7FF |
| Soft Text | #AAB2D5 |

## Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn
- PostgreSQL 12+ (or use Docker)
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/wonderlust_db"
JWT_SECRET="your_secret_key"
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
OPENAI_API_KEY="your_openai_key"
```

Initialize Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Database Setup

Using Docker:
```bash
docker-compose up -d
```

This creates PostgreSQL instance with:
- User: wonderlust_user
- Password: wonderlust_password
- Database: wonderlust_db

## Database Schema

### Tables
- **users** - User accounts and profiles
- **posts** - Travel posts with images
- **comments** - Post comments
- **likes** - Post likes
- **destinations** - Travel destinations
- **saved_places** - User's bookmarked destinations
- **followers** - Follow relationships
- **trip_plans** - AI-generated trip plans
- **notifications** - User notifications

## Deployment

### Frontend
Deploy to **Vercel**:
```bash
npm run build
# Push to GitHub and connect to Vercel
```

### Backend
Deploy to **Render**:
- Connect GitHub repo
- Set environment variables
- Auto-deploy on push

### Database
Use **Neon** for PostgreSQL hosting

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
OPENAI_API_KEY=...
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id/posts` - Get user's posts
- `POST /api/users/:id/follow` - Follow user

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Add comment

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details
- `GET /api/destinations/trending` - Get trending destinations

### Trip Planner
- `POST /api/trip-planner/generate` - Generate AI trip plan
- `GET /api/trip-planner` - Get user's trip plans

## Development

### Run Frontend
```bash
cd frontend && npm run dev
```

### Run Backend
```bash
cd backend && npm run dev
```

### Prisma Commands
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name description

# View data
npx prisma studio
```

## UI/UX Design

### Design Style
- **Glassmorphism** - Frosted glass effect
- **Soft shadows** - Subtle depth
- **Rounded cards** - Modern appearance
- **Blur effects** - Background transparency
- **Smooth animations** - Framer Motion

### Key Pages
- **Home** - Hero section with CTAs, trending destinations
- **Explore** - Discover and filter destinations
- **Destination Details** - Full destination info and posts
- **User Profile** - Profile, posts, saved places
- **Trip Planner** - AI itinerary generator
- **Admin Dashboard** - Management panel

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

---

Made with 🌍 by the Wonderlust Team
