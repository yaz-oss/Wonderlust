import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { generatePlan, getUserTripPlans } from '../controllers/tripPlannerController.js'

const router = Router()

// POST /api/trip-planner/generate
router.post('/generate', authenticateToken, generatePlan)

// GET /api/trip-planner
router.get('/', authenticateToken, getUserTripPlans)

export default router
