import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import prisma from '../utils/prisma.js'

const ticketCode = () => {
  const segment = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `WON-${Date.now().toString(36).toUpperCase()}-${segment}`
}

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { destinationId, travelerName, travelers = 1, visitDate } = req.body
    const userId = req.userId

    if (!destinationId || !travelerName || !visitDate) {
      return res.status(400).json({ error: 'Destination, traveler name, and visit date are required' })
    }

    const destination = await prisma.destination.findUnique({ where: { id: destinationId } })

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    const travelerCount = Math.max(1, Number(travelers))
    const totalPrice = travelerCount * 120

    const booking = await prisma.booking.create({
      data: {
        userId: userId!,
        destinationId,
        travelerName,
        travelers: travelerCount,
        visitDate: new Date(visitDate),
        totalPrice,
        ticketCode: ticketCode()
      },
      include: {
        destination: true,
        user: {
          select: { id: true, name: true, email: true, username: true }
        }
      }
    })

    res.status(201).json({ booking })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' })
  }
}

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ bookings })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
}
