import 'dotenv/config'

const load = (name) => {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(`${name} undefined`)
  }
  return value
}

export const JWT_SECRET = load('JWT_SECRET')
