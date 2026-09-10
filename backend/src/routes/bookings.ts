import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { createBooking, getMyBookings } from '../controllers/bookingController.js'

const router = Router()

router.get('/mine', authenticateToken, getMyBookings)
router.post('/', authenticateToken, createBooking)

export default router
