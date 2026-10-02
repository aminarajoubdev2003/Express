import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'

export function errorMiddleware( error: unknown, req: Request, res: Response, next: NextFunction ) {

    if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      statusCode: error.statusCode,
      message: error.message,
    })
    }
    
    return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal server error',
    })

}