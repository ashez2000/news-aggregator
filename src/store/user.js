import { AppError } from '../utils/app-error.js'

class UserStore {
  constructor() {
    this._db = []
  }

  save(user) {
    if (this._db.find((u) => u.email === user.email)) {
      throw new AppError('Email already exists', 400)
    }

    this._db.push(user)
  }

  findByEmail(email) {
    return this._db.find((u) => u.email === email)
  }

  findById(id) {
    return this._db.find((u) => u.id === id)
  }
}

export const userStore = new UserStore()
