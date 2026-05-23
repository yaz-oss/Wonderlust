import { Router } from 'express'
import { 
  getAllDestinations, 
  getDestinationById, 
  getTrendingDestinations 
} from '../controllers/destinationController.js'

const router = Router()

// GET /api/destinations
router.get('/', getAllDestinations)

// GET /api/destinations/trending
router.get('/trending', getTrendingDestinations)

// GET /api/destinations/:id
router.get('/:id', getDestinationById)

export default router
