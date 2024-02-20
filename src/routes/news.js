import { Router } from 'express'
import { AppError } from '../utils/app-error.js'
import { protect } from '../middlewares/auth.js'
import { userStore } from '../store/user.js'
import { newsStore } from '../store/news.js'
import { fetchNews } from '../services/news.js'

const router = Router()

router.get('/', protect, (req, res) => {
  const user = userStore.findById(req.user.id)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  const news = newsStore.findMany(user.preferences)

  res.status(200).json({
    news,
  })
})

router.post('/', async (req, res) => {
  const news = await fetchNews()

  newsStore.save(news)

  res.status(200).json({
    news,
  })
})

export default router
