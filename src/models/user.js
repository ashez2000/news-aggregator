import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export class User {
  constructor(email, password) {
    this.id = crypto.randomUUID()
    this.email = email
    this.password = bcrypt.hashSync(password)
  }

  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
}
