import { Router } from 'express'
import passport from 'passport'
import { register, login, googleCallback, googleExchangeCode, getGoogleAuthUrl } from '../controllers/authController.js'

const router = Router()

// Manual auth routes
router.post('/register', register)
router.post('/login', login)

// Google OAuth routes
router.post('/google-exchange-code', googleExchangeCode)
router.get('/google-auth-url', getGoogleAuthUrl)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
)

export default router
