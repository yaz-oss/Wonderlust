import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const { country, category, page = 1, limit = 10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const where: any = {}
    if (country) where.country = country
    if (category) where.category = category

    const destinations = await prisma.destination.findMany({
      where,
      skip,
      take: Number(limit),
      include: {
        _count: {
          select: { posts: true, savedBy: true }
        }
      }
    })

    res.json({ destinations })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' })
  }
}

export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            user: {
              select: { id: true, username: true, name: true, avatar: true }
            }
          }
        }
      }
    })

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    res.json(destination)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination' })
  }
}

export const getTrendingDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany({
      take: 10,
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: { posts: true, savedBy: true }
        }
      }
    })

    res.json({ destinations })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending destinations' })
  }
}
