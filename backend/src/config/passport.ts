import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import prisma from '../utils/prisma.js'

// Parse admin emails from environment variable
const getAdminEmails = (): string[] => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  return adminEmailsEnv
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0)
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value || `${profile.id}@google.com`
      const adminEmails = getAdminEmails()
      const isAdminEmail = adminEmails.includes(email.toLowerCase())

      // Check if user exists with Google ID
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id }
      })

      // If not, check if user exists with email
      if (!user && profile.emails && profile.emails.length > 0) {
        user = await prisma.user.findUnique({
          where: { email: email }
        })

        // Update existing user with Google ID and role if admin
        if (user) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { 
              googleId: profile.id,
              ...(isAdminEmail && user.role !== 'ADMIN' && { role: 'ADMIN' })
            }
          })
        }
      }

      // If user doesn't exist, create new one
      if (!user) {
        const username = profile.displayName.replace(/\s+/g, '').toLowerCase() + Date.now()

        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            email,
            username,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
            role: isAdminEmail ? 'ADMIN' : 'USER'
          }
        })
      }

      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }
)

passport.use(googleStrategy)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport
