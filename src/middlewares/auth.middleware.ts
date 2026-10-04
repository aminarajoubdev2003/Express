
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../errors/app.error.js'
import { env } from '../config/env.js'

export function authMiddleware ( req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(401, 'Authentication required');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new AppError(401, 'Invalid authorization header');
  }

  try {
    let payload :any
    payload = jwt.verify(token, env.jwtSecret)
    req.user = payload
    next()
  } catch {
    throw new AppError(401, 'Invalid or expired token')
  }
}

