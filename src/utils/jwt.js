import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../env.js'

export const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '8h',
  })
}

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    return payload
  } catch (err) {
    console.log(err)
    return null
  }
}
