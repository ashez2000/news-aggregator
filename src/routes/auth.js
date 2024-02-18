import { Router } from 'express'
import { signToken } from '../utils/jwt.js'
import { User, UserSchema } from '../models/user.js'
import { userStore } from '../store/user.js'

const router = Router()

router.post('/register', (req, res) => {
  const { email, password } = UserSchema.parse(req.body)

  const user = new User(email, password)
  const token = signToken(user.id)

  userStore.save(user)

  res.status(201).json({
    token,
  })
})

router.post('/login', (req, res) => {
  const { email, password } = UserSchema.parse(req.body)

  const user = userStore.findByEmail(email)
  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  if (!user.verifyPassword(password)) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const token = signToken(user.id)

  res.status(201).json({
    token,
  })
})

export default router
