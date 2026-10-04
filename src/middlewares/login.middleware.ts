import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const {  email, password } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


  if (typeof email !== 'string') {
   throw new AppError(400, 'Email must be a string');
  }

  if (email.trim() === '') {
    throw new AppError(400, 'Email is required')
  }

  if (!emailRegex.test(email)) {
    throw new AppError(400, 'Invalid email')
  }

  if (typeof password !== 'string' || password.length < 8) {
    throw new AppError(400,'Password must be at least 8 characters')
  }

  next();
}