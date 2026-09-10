import { Request, Response } from 'express'
import axios from 'axios'
import prisma from '../utils/prisma.js'
import { hashPassword, comparePasswords } from '../utils/crypto.js'
import { generateToken } from '../utils/jwt.js'

// Parse admin emails from environment variable
const getAdminEmails = (): string[] => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ''
  return adminEmailsEnv
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0)
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, name, password } = req.body

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword
      }
    })

    // Generate token
    const token = generateToken(user.id, user.role)

    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username, name: user.name, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Compare password
    const isPasswordValid = await comparePasswords(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id, user.role)

    res.json({
      user: { id: user.id, email: user.email, username: user.username, name: user.name, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}

// Exchange Google authorization code for token
export const googleExchangeCode = async (req: Request, res: Response) => {
  try {
    const { code, redirectUri } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' })
    }

    // Use the redirect_uri passed from frontend, or fall back to environment variable
    const callbackUrl = redirectUri || process.env.GOOGLE_FRONTEND_CALLBACK_URL || 'http://localhost:3000/auth-callback'

    // Exchange code with Google for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: callbackUrl
    })

    const { id_token } = tokenResponse.data

    // Decode the ID token to get user info (basic decoding without verification for now)
    const payload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString())
    
    const { email, name, picture, sub: googleId } = payload
    const adminEmails = getAdminEmails()
    const isAdminEmail = adminEmails.includes(email.toLowerCase())

    // Check if user exists with Google ID
    let user = await prisma.user.findUnique({
      where: { googleId }
    })

    // If not, check if user exists with email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email }
      })

      // Update existing user with Google ID and role if admin
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId,
            ...(isAdminEmail && user.role !== 'ADMIN' && { role: 'ADMIN' })
          }
        })
      }
    }

    // If user doesn't exist, create new one
    if (!user) {
      const username = (name || email).replace(/\s+/g, '').toLowerCase() + Date.now()

      user = await prisma.user.create({
        data: {
          googleId,
          email,
          username,
          name: name || email,
          avatar: picture,
          role: isAdminEmail ? 'ADMIN' : 'USER'
        }
      })
    }

    // Generate JWT token
    const token = generateToken(user.id, user.role)

    res.json({
      user: { id: user.id, email: user.email, username: user.username, name: user.name, role: user.role },
      token
    })
  } catch (error: any) {
    console.error('Google exchange code error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to exchange authorization code' })
  }
}

// Google OAuth Callback (for server-side flow)
export const googleCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    const user = req.user as any
    const token = generateToken(user.id, user.role)

    // Return token as query parameter so frontend can access it
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth-success?token=${token}&userId=${user.id}`
    )
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`)
  }
}

// Get Google Auth URL
export const getGoogleAuthUrl = (req: Request, res: Response) => {
  try {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      redirect_uri: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      response_type: 'code',
      scope: 'profile email',
      access_type: 'offline'
    }).toString()}`

    res.json({ authUrl: googleAuthUrl })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate auth URL' })
  }
}
