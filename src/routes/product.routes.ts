import express from 'express'
import { prisma } from '../prisma/prisma.service.js'
import { ProductService } from '../services/product.service.js'
import { ProductController } from '../controllers/product.controller.js'

const router = express.Router()


const productService = new ProductService(prisma)
const productController = new ProductController(productService)

router.post('/', productController.create.bind(productController))

router.get('/', productController.findAll.bind(productController))

router.get('/:id', productController.findOne.bind(productController))

router.delete('/:id', productController.remove.bind(productController))

export default router