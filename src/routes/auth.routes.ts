import express from 'express';

import { registerMiddleware } from '../middlewares/register.middleware.js'
import { AuthController } from '../controllers/auth.controller.js'
import { AuthService } from '../services/auth.service.js'
import { loginMiddleware } from '../middlewares/login.middleware.js';

const router = express.Router()

const authService = new AuthService()
const authController = new AuthController(authService)

router.post('/register',registerMiddleware,authController.register.bind(authController))
router.post('/login',loginMiddleware,authController.login.bind(authController))

export default router;