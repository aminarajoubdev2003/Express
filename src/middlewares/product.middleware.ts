import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'

export function productMiddleware(req: Request, res: Response, next: NextFunction) {
    const { title, price } = req.body
    const arabicOnly = /^[\u0600-\u06FF\s]+$/

    if (typeof title !== 'string') { 
        throw new AppError(400, 'Title must be a string')
    }
    if (title.trim() === '') { 
        throw new AppError(400, 'Title is required')
    }
    if (!arabicOnly.test(title)) {
        throw new AppError(400,'Title must contain Arabic letters only')
    }
    if (typeof price !== 'number' || !Number.isFinite(price)) {
        throw new AppError(400, 'Price must be a numeric value')
    }
    if (price <= 0 ) {
        throw new AppError(400,'Price must be greater than zero')
    }
  next()
}