import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.js'
import { 
  getAllPosts, 
  createPost, 
  getPostById, 
  deletePost, 
  likePost, 
  addComment 
} from '../controllers/postController.js'

const router = Router()

// GET /api/posts
router.get('/', getAllPosts)

// POST /api/posts
router.post('/', authenticateToken, createPost)

// GET /api/posts/:id
router.get('/:id', getPostById)

// DELETE /api/posts/:id
router.delete('/:id', authenticateToken, deletePost)

// POST /api/posts/:id/like
router.post('/:id/like', authenticateToken, likePost)

// POST /api/posts/:id/comment
router.post('/:id/comment', authenticateToken, addComment)

export default router
