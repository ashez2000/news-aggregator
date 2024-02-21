import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),

  preferences: z
    .enum(['general', 'business', 'sports', 'technology'])
    .array()
    .min(1),
})

export class User {
  constructor(email, password, preferences) {
    this.id = crypto.randomUUID()
    this.email = email
    this.password = bcrypt.hashSync(password)
    this.preferences = preferences
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
}
