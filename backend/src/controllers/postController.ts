import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth.js'

const prisma = new PrismaClient()

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const posts = await prisma.post.findMany({
      skip,
      take: Number(limit),
      include: {
        user: {
          select: { id: true, username: true, name: true, avatar: true }
        },
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ posts })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
}

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, images, locationId, latitude, longitude } = req.body
    const userId = req.userId

    const post = await prisma.post.create({
      data: {
        userId: userId!,
        title,
        description,
        images,
        locationId,
        latitude,
        longitude
      }
    })

    res.status(201).json({ message: 'Post created', post })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, name: true, avatar: true }
        },
        comments: {
          include: {
            user: {
              select: { id: true, username: true, name: true, avatar: true }
            }
          }
        },
        likes: true
      }
    })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
}

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const post = await prisma.post.findUnique({ where: { id } })

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    await prisma.post.delete({ where: { id } })

    res.json({ message: 'Post deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
}

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const like = await prisma.like.create({
      data: {
        postId: id,
        userId: userId!
      }
    })

    res.json({ message: 'Post liked', like })
  } catch (error) {
    res.status(500).json({ error: 'Failed to like post' })
  }
}

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { text } = req.body
    const userId = req.userId

    const comment = await prisma.comment.create({
      data: {
        postId: id,
        userId: userId!,
        text
      }
    })

    res.status(201).json({ message: 'Comment added', comment })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' })
  }
}
