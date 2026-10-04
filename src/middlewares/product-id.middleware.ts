import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'

export function productIdMiddleware(req: Request, res: Response, next: NextFunction) {
const  id  = Number(req.params.id)

if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(400, 'Invalid product id')
}

  next()
}