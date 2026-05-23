# Wonderlust Deployment Guide

## Production Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://wonderlust-api.render.com/api
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
```

### Backend (.env.production)
```
DATABASE_URL=postgresql://user:password@neon.tech/wonderlust_db
JWT_SECRET=your_production_secret_key_123456
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://wonderlust-api.render.com/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

## Deployment Steps

### 1. Frontend Deployment (Vercel)
- Push frontend to GitHub
- Connect repo to Vercel
- Set environment variables
- Auto-deploys on push

### 2. Backend Deployment (Render)
- Push backend to GitHub
- Connect repo to Render
- Set environment variables
- Set build command: `npm run build`
- Set start command: `npm start`

### 3. Database (Neon)
- Create PostgreSQL instance on Neon
- Copy connection string to DATABASE_URL
- Run migrations: `npx prisma migrate deploy`

## Monitoring & Maintenance

- Check Vercel analytics
- Monitor Render logs
- Set up error tracking (Sentry)
- Regular database backups
- Performance monitoring
