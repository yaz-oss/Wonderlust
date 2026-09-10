# Google OAuth Setup Guide for Wonderlust

## Security Warning ⚠️

**IMPORTANT:** You've shared your OAuth credentials in plain text. These credentials are now **COMPROMISED** and should be revoked immediately:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services → Credentials**
3. Find your OAuth 2.0 Client ID
4. Delete the compromised credentials
5. Create NEW credentials following the steps below

## Prerequisites

- Google Cloud Project set up
- OAuth 2.0 Client ID and Secret generated

## Step 1: Generate New Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API**
4. Go to **APIs & Services → Credentials**
5. Click **Create Credentials → OAuth 2.0 Client IDs**
6. Select **Web application**
7. Add Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `http://localhost:3000/auth-callback` (development)
   - Your production URLs when deploying
8. Copy the **Client ID** and **Client Secret**

## Step 2: Backend Configuration

### Update Backend Environment Variables

Edit `backend/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_new_client_id
GOOGLE_CLIENT_SECRET=your_new_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
SESSION_SECRET=your_random_session_secret_key
FRONTEND_URL=http://localhost:3000

# Admin Emails - Users with these emails will automatically get admin role
ADMIN_EMAILS=your_admin_email@gmail.com,another_admin@gmail.com
```

**Important:** Add your admin email(s) to `ADMIN_EMAILS`. When users sign in with Google using these emails, they will automatically be granted the `ADMIN` role and redirected to the admin dashboard.

### Run Database Migration

```bash
cd backend

# Run migrations to add googleId field
npm run db:dev

# Or if you need to create a fresh database
npm run db:init
```

## Step 3: Frontend Configuration

### Update Frontend Environment Variables

Edit `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_new_client_id
VITE_GOOGLE_CALLBACK_URL=http://localhost:3000/auth-callback
```

## Step 4: Start the Application

### Terminal 1 - Backend

```bash
cd backend
npm install  # if not already installed
npm run dev
```

Server will run at: `http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm install  # if not already installed
npm run dev
```

Application will run at: `http://localhost:3000`

## Features Implemented

### ✅ Manual Authentication
- **Login** with email and password
- **Register** with name, username, email, and password

### ✅ Google OAuth Authentication
- **Sign in with Google** button on Login page
- **Sign up with Google** button on Register page
- Automatic user creation from Google profile
- Seamless authentication flow

## How Google OAuth Works in This Setup

### Frontend Flow:
1. User clicks "Sign in/up with Google" button
2. Redirected to Google login page
3. After authentication, Google redirects to `http://localhost:3001/auth-callback` (frontend)
4. Frontend's AuthCallback component receives authorization code
5. Frontend sends code to backend: `POST /api/auth/google-exchange-code`
6. Backend verifies code with Google, creates/updates user, returns JWT token
7. Frontend stores token and redirects based on user role:
   - Admin email → `/admin` (admin dashboard)
   - Regular email → `/dashboard` (user dashboard)

### Backend Flow:
1. Frontend sends authorization code to `/api/auth/google-exchange-code`
2. Backend exchanges code with Google for ID token
3. Backend decodes ID token to get user info (email, name, picture)
4. Check if user exists by `googleId`
5. If not found by `googleId`, check by email
6. Create new user or update existing user with `googleId`
7. **Check if email is in `ADMIN_EMAILS` → set role to ADMIN or USER**
8. Generate JWT token
9. Return token to frontend

## Endpoint Reference

### Manual Auth Endpoints:
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password

### Google OAuth Endpoints:
- `POST /api/auth/google-exchange-code` - Exchange Google auth code for JWT token ✅ NEW
- `GET /api/auth/google-auth-url` - Get Google auth URL (alternative server-side flow)
- `GET /api/auth/google` - Initiate OAuth flow (alternative server-side flow)
- `GET /api/auth/google/callback` - OAuth callback from Google (alternative server-side flow)

## Testing OAuth Login

### Test Manual Login:
1. Visit `http://localhost:3001/register` (or 3000 if available)
2. Create account with email/password
3. Visit `http://localhost:3001/login`
4. Login with email/password

### Test Google OAuth (User):
1. Visit `http://localhost:3001/login` or `/register`
2. Click "Sign in/up with Google"
3. Complete Google authentication with a non-admin email
4. Should be redirected to dashboard (`/dashboard`)

### Test Google OAuth (Admin):
1. Visit `http://localhost:3001/login` or `/register`
2. Click "Sign in/up with Google"
3. Complete Google authentication with your admin email (from `ADMIN_EMAILS`)
4. Should be redirected to admin dashboard (`/admin`)

## Recent Fixes (Important! ✅)

### Fixed: Google OAuth Routes Not Found (404 Error)

**Problem:** When clicking "Sign in with Google", users got a 404 error or "route not found" error.

**Root Cause:** The backend was missing the `/api/auth/google-exchange-code` endpoint that the frontend needed to exchange the authorization code for a JWT token.

**Solution:** 
1. ✅ Added `googleExchangeCode` function to handle code exchange
2. ✅ Added `POST /api/auth/google-exchange-code` route
3. ✅ Properly integrated admin email checking (existing users with admin email get ADMIN role)
4. ✅ Added environment variable `GOOGLE_FRONTEND_CALLBACK_URL`

**Result:** Google OAuth login now works correctly and admin users are redirected to `/admin` dashboard.

## Troubleshooting

### "Redirect URI mismatch" error
- Ensure your redirect URIs in Google Cloud Console match exactly
- Check `GOOGLE_CALLBACK_URL` in backend `.env`
- Check `VITE_GOOGLE_CALLBACK_URL` in frontend `.env.local`

### "Cannot find module 'passport'" error
- Run `npm install` in backend directory
- All dependencies should be in `package.json`

### User not being created
- Check browser console for errors
- Check backend server logs
- Verify database connection with `npm run prisma:studio`

### Token not persisting after login
- Check browser localStorage in DevTools
- Verify `useAuthStore` is working correctly
- Check that token is being set in auth store

## Production Deployment Notes

### Before Deploying:

1. **Update OAuth Redirect URIs** in Google Cloud Console
2. **Set environment variables** on hosting platform:
   - Backend: Railway, Render, Heroku, etc.
   - Frontend: Vercel, Netlify, etc.
3. **Update FRONTEND_URL** in backend `.env` to production URL
4. **Update VITE_API_URL** in frontend `.env` to production API URL
5. **Use strong secrets**:
   - `JWT_SECRET` - Random 32+ character string
   - `SESSION_SECRET` - Random 32+ character string
6. **Enable HTTPS** - Required for production OAuth

### Example Production Values:

**Backend `.env`:**
```env
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_secret
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/auth/google/callback
FRONTEND_URL=https://yourdomain.com
SESSION_SECRET=your_random_production_key
DATABASE_URL=your_production_database_url
```

**Frontend `.env.production`:**
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_GOOGLE_CLIENT_ID=your_production_client_id
VITE_GOOGLE_CALLBACK_URL=https://yourdomain.com/auth-callback
```

## Files Modified/Created

### Backend:
- ✅ `backend/src/config/passport.ts` - NEW - Google OAuth strategy
- ✅ `backend/src/controllers/authController.ts` - Updated with Google functions
- ✅ `backend/src/routes/auth.ts` - Updated with Google routes
- ✅ `backend/src/index.ts` - Updated with passport middleware
- ✅ `backend/prisma/schema.prisma` - Added `googleId` field
- ✅ `backend/prisma/migrations/add_google_id/migration.sql` - NEW - Database migration
- ✅ `backend/.env` - Updated with Google credentials
- ✅ `backend/.env.example` - Updated documentation

### Frontend:
- ✅ `frontend/src/hooks/useGoogleAuth.ts` - NEW - Google auth hook
- ✅ `frontend/src/pages/AuthCallback.tsx` - NEW - OAuth callback handler
- ✅ `frontend/src/pages/Login.tsx` - Updated with Google button
- ✅ `frontend/src/pages/Register.tsx` - Updated with Google button
- ✅ `frontend/src/App.tsx` - Added auth callback routes
- ✅ `frontend/.env.local` - NEW - Frontend environment variables
- ✅ `frontend/.env.example` - Updated documentation

## Next Steps

1. ✅ Generate new OAuth credentials
2. ✅ Update `.env` files with new credentials
3. ✅ Run database migrations
4. ✅ Start backend: `npm run dev`
5. ✅ Start frontend: `npm run dev`
6. ✅ Test manual login/register
7. ✅ Test Google OAuth login/signup
8. ✅ Deploy to production with production credentials

---

**Support:** For issues or questions, check the troubleshooting section or review the implementation files.
