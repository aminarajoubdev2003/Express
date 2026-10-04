import type { Request, Response } from 'express'
import { ProductService } from '../services/product.service.js'
import { AppError } from '../errors/app.error.js'

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async create(req: Request, res: Response) {
  const { title, price } = req.body

  const product = await this.productService.create( title, price )
  res.status(201).json(product)
  }

  async findAll(req: Request, res: Response) {
  const products = await this.productService.findAll()
  res.status(200).json(products)
  }

  async findOne(req: Request, res: Response) {
  const  id  = Number(req.params.id)
  const product = await this.productService.findOne( id )
  res.status(200).json(product)
  }

  async update(req: Request, res: Response) {
  const  id  = Number(req.params.id)
  const { title, price } = req.body
  const product = await this.productService.update( id , title, price )
  res.status(200).json(product)
  }

  async remove(req: Request, res: Response) {
  const  id  = Number(req.params.id)
  const product = await this.productService.remove( id )
  res.status(200).json(product)
  }

}