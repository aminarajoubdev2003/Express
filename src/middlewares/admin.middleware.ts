import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/app.error.js'
import { UserRole } from '../generated/prisma/client.js'

export function adminMiddleware( req: Request, res: Response, next: NextFunction ) { 
if (req.user.role !== UserRole.ADMIN) { 
    throw new AppError(403, 'Admin access required')
} 
next()
}