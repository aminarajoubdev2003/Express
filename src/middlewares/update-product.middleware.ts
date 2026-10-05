import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'

export function UpdateproductMiddleware(req: Request, res: Response, next: NextFunction) {
    const updateData: { 
      title?: string 
      price?: number 
    } = req.body

    const arabicOnly = /^[\u0600-\u06FF\s]+$/

    if( updateData.title !== undefined ){ 
    if (!arabicOnly.test(updateData.title)) { 
    throw new AppError(400,'Title must contain Arabic letters only'); 
    } 
    } 
    if( updateData.price !== undefined ){ 
    if (typeof updateData.price !== 'number' || !Number.isFinite(updateData.price)) { 
    throw new AppError(400, 'Price must be a numeric value'); 
    } 
    if (updateData.price <= 0 ) { 
    throw new AppError(400,'Price must be greater than zero'); 
    } 
    } 
    if (updateData.title === undefined && updateData.price === undefined) { 
    throw new AppError(400, 'At least one field is required'); 
    } 
  next()
}