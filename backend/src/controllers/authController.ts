import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePasswords } from '../utils/crypto.js'
import { generateToken } from '../utils/jwt.js'

const prisma = new PrismaClient()

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
    const token = generateToken(user.id)

    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username, name: user.name },
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
    const token = generateToken(user.id)

    res.json({
      user: { id: user.id, email: user.email, username: user.username, name: user.name },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}
