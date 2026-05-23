import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth.js'

const prisma = new PrismaClient()

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, bio, avatar } = req.body
    const userId = req.userId

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(avatar && { avatar })
      }
    })

    res.json({ message: 'Profile updated', user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' })
  }
}

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId

    if (userId === id) {
      return res.status(400).json({ error: 'Cannot follow yourself' })
    }

    const follower = await prisma.follower.create({
      data: {
        followerId: userId!,
        followingId: id
      }
    })

    res.json({ message: 'User followed', follower })
  } catch (error) {
    res.status(500).json({ error: 'Failed to follow user' })
  }
}
