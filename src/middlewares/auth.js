import { AppError } from '../utils/app-error.js'
import { verifyToken } from '../utils/jwt.js'

// protect middleware rejects unauthenticated requests
// - Adds auth payload to the request context
export const protect = (req, res, next) => {
  const token = req.headers && req.headers.authorization
  if (!token) {
    console.log('protect: Auth token undefined')
    throw new AppError('Unauthorized', 401)
  }

  const payload = verifyToken(token)
  if (!payload) {
    console.log('protect: Invalid token')
    throw new AppError('Unauthorized', 401)
  }

  req.user = payload
  next()
}
