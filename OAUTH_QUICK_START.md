# Quick Start - Google OAuth Setup

## 🔴 IMMEDIATE ACTION REQUIRED

Your OAuth credentials were exposed! Do this NOW:

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Delete the exposed credentials
3. Create NEW credentials (see steps below)

---

## ✅ Setup Checklist

### Step 1: Create New Google OAuth Credentials
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new OAuth 2.0 Client ID
- [ ] Add redirect URIs:
  - [ ] `http://localhost:5000/api/auth/google/callback`
  - [ ] `http://localhost:3000/auth-callback`
- [ ] Copy new **Client ID**
- [ ] Copy new **Client Secret**

### Step 2: Update Backend Configuration
- [ ] Open `backend/.env`
- [ ] Update `GOOGLE_CLIENT_ID=your_new_id`
- [ ] Update `GOOGLE_CLIENT_SECRET=your_new_secret`
- [ ] Verify other settings are correct

### Step 3: Update Frontend Configuration
- [ ] Open `frontend/.env.local`
- [ ] Update `VITE_GOOGLE_CLIENT_ID=your_new_id`
- [ ] Verify `VITE_GOOGLE_CALLBACK_URL=http://localhost:3000/auth-callback`

### Step 4: Database Setup
```bash
cd backend
npm run db:dev  # Run migrations
```

### Step 5: Run Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev  # Runs on http://localhost:5000

# Terminal 2 - Frontend  
cd frontend
npm run dev  # Runs on http://localhost:3000
```

### Step 6: Test
- [ ] Test manual login at `http://localhost:3000/login`
- [ ] Test manual signup at `http://localhost:3000/register`
- [ ] Test Google login (click "Sign in with Google")
- [ ] Test Google signup (click "Sign up with Google")

---

## 🎯 What Was Added

### Backend Features:
- ✅ Google OAuth strategy with Passport.js
- ✅ User creation/update from Google profile
- ✅ JWT token generation after OAuth login
- ✅ Session management

### Frontend Features:
- ✅ Google login button on Login page
- ✅ Google signup button on Register page
- ✅ OAuth callback handler
- ✅ Automatic token storage and login

### Authentication Methods:
- ✅ Manual: Email/Password login & signup
- ✅ OAuth: Google login & signup

---

## 📝 Key Files

**Backend:**
- `backend/src/config/passport.ts` - OAuth strategy
- `backend/src/controllers/authController.ts` - Auth logic
- `backend/src/routes/auth.ts` - Auth routes

**Frontend:**
- `frontend/src/hooks/useGoogleAuth.ts` - OAuth hook
- `frontend/src/pages/AuthCallback.tsx` - Callback handler
- `frontend/src/pages/Login.tsx` - Login with Google button
- `frontend/src/pages/Register.tsx` - Signup with Google button

---

## 🚀 Production Deployment

Before deploying update:
1. `GOOGLE_CLIENT_ID` - Production credentials
2. `GOOGLE_CLIENT_SECRET` - Production credentials  
3. `GOOGLE_CALLBACK_URL` - Production URL
4. `FRONTEND_URL` - Production URL
5. `JWT_SECRET` - Strong random secret
6. `SESSION_SECRET` - Strong random secret
7. `DATABASE_URL` - Production database

---

## ❓ Need Help?

See `GOOGLE_OAUTH_SETUP.md` for detailed troubleshooting and documentation.
