import { Router } from 'express'
import {
  getAdminOverview,
  getAdminUsers,
  getAdminBookings,
  getAdminDestinations
} from '../controllers/adminController.js'
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/overview', authenticateToken, authorizeAdmin, getAdminOverview)
router.get('/users', authenticateToken, authorizeAdmin, getAdminUsers)
router.get('/bookings', authenticateToken, authorizeAdmin, getAdminBookings)
router.get('/destinations', authenticateToken, authorizeAdmin, getAdminDestinations)

export default router
