import { Router } from 'express'
import { AppError } from '../utils/app-error.js'
import { protect } from '../middlewares/auth.js'
import { userStore } from '../store/user.js'
import { UserSchema } from '../models/user.js'

const router = Router()

router.get('/preferences', protect, (req, res) => {
  const userId = req.user.id

  const user = userStore.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    preferences: user.preferences,
  })
})

router.put('/preferences', protect, (req, res) => {
  const { preferences } = UserSchema.pick({ preferences: true }).parse(req.body)

  const userId = req.user.id
  const user = userStore.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  user.preferences = preferences

  res.status(200).json({
    preferences: user.preferences,
  })
})

export default router
