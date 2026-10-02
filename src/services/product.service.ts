import { AppError } from '../errors/app.error.js';
import { Prisma } from '../generated/prisma/client.js';
import {  PrismaService } from '../prisma/prisma.service.js';

export class ProductService {
constructor( private  prisma: PrismaService){}

async create( data: { title: string; price: number } ) {
    const arabicOnly = /^[\u0600-\u06FF\s]+$/

    if (!arabicOnly.test(data.title)) {
    throw new AppError(400,'Title must contain Arabic letters only');
    }
    if (typeof data.price !== 'number' || !Number.isFinite(data.price)) {
    throw new AppError(400, 'Price must be a numeric value');
    }
    if (data.price <= 0 ) {
    throw new AppError(400,'Price must be greater than zero');
    }
    
    const  existingProduct = await this.prisma.product.findUnique({
      where: {
      title: data.title,
    }
    })
    if( existingProduct ){
      throw new AppError(409,'Product already exists');
    }
    try{
    const product =  this.prisma.product.create({
      data: {
      title: data.title,
      price: data.price
      },
      select:{
      id: true,
      title: true,
      price: true
    }
    })
    return  product
    }catch(error){

      if ( error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError(409, 'Product already exists');
      }
      throw error
    }
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
    select:{
    id: true,
    title: true,
    price: true
    }
    });
    
    return products
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
    where: { id: id },
    select:{
    id: true,
    title: true,
    price: true
    }
    })
    if( !product ){
      throw new AppError(404,'Product not found');
    }
    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: id }
    })
    if( !product ){
      throw new AppError(404,'Products not found');
    }
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id }
    })
    return { message:'Product deleted successfully' };
  }

}