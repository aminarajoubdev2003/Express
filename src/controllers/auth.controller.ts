import type { AuthService } from "../services/auth.service.js"
import type { Request, Response } from 'express'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
  const { name, email, password } = req.body

  const user = await this.authService.register( name, email, password )
  res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
  const {  email, password } = req.body

  const user = await this.authService.login(  email, password )
  res.status(200).json(user)
  }
}