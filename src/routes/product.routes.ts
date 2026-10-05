import express from 'express'
import { prisma } from '../prisma/prisma.service.js'
import { ProductService } from '../services/product.service.js'
import { ProductController } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { adminMiddleware } from '../middlewares/admin.middleware.js'
import { productMiddleware } from '../middlewares/product.middleware.js'
import { productIdMiddleware } from '../middlewares/product-id.middleware.js'
import { UpdateproductMiddleware } from '../middlewares/update-product.middleware.js'

const router = express.Router()


const productService = new ProductService(prisma)
const productController = new ProductController(productService)

router.post('/',authMiddleware , adminMiddleware, productMiddleware, productController.create.bind(productController))

router.get('/',authMiddleware , productController.findAll.bind(productController))

router.get('/:id',authMiddleware , productIdMiddleware, productController.findOne.bind(productController))

router.patch('/:id',authMiddleware , adminMiddleware, productIdMiddleware ,UpdateproductMiddleware, productController.update.bind(productController));

router.delete('/:id',authMiddleware , adminMiddleware,  productIdMiddleware, productController.remove.bind(productController))

export default router