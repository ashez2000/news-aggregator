import express from 'express'
import morgan from 'morgan'
import 'express-async-errors'

import { notFound, errorHandler } from './middlewares/error.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import newsRoutes from './routes/news.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/news', newsRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
