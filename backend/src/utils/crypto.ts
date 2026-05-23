import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export const generateRandomString = (length: number = 10): string => {
  return Math.random().toString(36).substring(2, 2 + length)
}
