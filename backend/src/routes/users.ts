import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { getUserProfile, updateProfile, followUser } from '../controllers/userController.js'

const router = Router()

// GET /api/users/:id
router.get('/:id', getUserProfile)

// PUT /api/users/profile
router.put('/profile', authenticateToken, updateProfile)

// POST /api/users/:id/follow
router.post('/:id/follow', authenticateToken, followUser)

export default router
