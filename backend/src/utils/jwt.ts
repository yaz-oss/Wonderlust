import jwt, { SignOptions } from 'jsonwebtoken'

export const generateToken = (userId: string, expiresIn: SignOptions['expiresIn'] = '7d') => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn }
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret')
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '30d' }
  )
}
