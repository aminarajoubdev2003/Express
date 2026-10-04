import bcrypt from 'bcrypt'
import { prisma } from '../prisma/prisma.service.js'
import { AppError } from '../errors/app.error.js'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(409, 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });

    return user
  }

  async login( email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new AppError(401, 'Invalid email or password')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError(401, 'Invalid email or password')
    }

    const token = jwt.sign(
    {
        sub: user.id,
        email: user.email,
        role: user.role
    },
    env.jwtSecret,
    {
      expiresIn: '1h',
    }
    )

    return { accessToken: token }
    
  }
}