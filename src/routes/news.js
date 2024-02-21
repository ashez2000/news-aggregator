import { Router } from 'express'
import { ACCESS_KEY } from '../env.js'
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

// seeds the news
router.post('/', async (req, res) => {
  const accessKey = req.headers && req.headers.authorization
  if (!accessKey) {
    throw new AppError('Unauthorized', 401)
  }

  if (accessKey !== ACCESS_KEY) {
    throw new AppError('Unauthorized', 401)
  }

  const news = await fetchNews()

  newsStore.save(news)

  res.status(200).json({
    news,
  })
})

router.post('/:id/favorites', protect, (req, res) => {
  const news = newsStore.findById(req.params.id)
  if (!news) {
    throw new AppError('News not found', 404)
  }

  const user = userStore.findById(req.user.id)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  user.favorites.add(req.params.id)

  res.status(200).json({
    favorites: [...user.favorites],
  })
})

router.get('/favorites', protect, (req, res) => {
  const user = userStore.findById(req.user.id)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  const favorites = [...user.favorites]

  const news = favorites.map((id) => newsStore.findById(id))

  res.status(200).json({
    news,
  })
})

router.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword

  const news = newsStore.searchNews(keyword)

  res.status(200).json({
    news,
  })
})

export default router
