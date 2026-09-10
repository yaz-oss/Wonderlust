import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import prisma from '../utils/prisma.js'

export const getAdminOverview = async (req: AuthRequest, res: Response) => {
  try {
    const [
      users,
      bookings,
      destinations,
      revenue,
      latestBookings,
      latestUsers,
      popularDestinations
    ] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.destination.count(),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'CONFIRMED' }
      }),
      prisma.booking.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          destination: { select: { id: true, name: true, country: true } }
        }
      }),
      prisma.user.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
      }),
      prisma.destination.findMany({
        take: 5,
        include: {
          _count: { select: { bookings: true } }
        },
        orderBy: {
          bookings: { _count: 'desc' }
        }
      })
    ])

    res.json({
      stats: {
        users,
        bookings,
        destinations,
        revenue: revenue._sum.totalPrice ?? 0
      },
      latestBookings,
      latestUsers,
      popularDestinations
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin overview' })
  }
}

export const getAdminUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { bookings: true } }
      }
    })
    res.json({ users })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getAdminBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        destination: { select: { id: true, name: true, country: true } }
      }
    })
    res.json({ bookings })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
}

export const getAdminDestinations = async (req: AuthRequest, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20))
    const skip = (page - 1) * limit
    const search = String(req.query.search || '').trim()
    const category = String(req.query.category || '').trim()
    const country = String(req.query.country || '').trim()

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' }
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' }
    }

    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: { select: { bookings: true } }
        }
      }),
      prisma.destination.count({ where })
    ])

    res.json({
      destinations,
      total,
      page,
      limit,
      hasMore: page * limit < total
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' })
  }
}
