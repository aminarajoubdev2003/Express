import { AppError } from '../errors/app.error.js';
import { Prisma } from '../generated/prisma/client.js';
import {  PrismaService } from '../prisma/prisma.service.js';

export class ProductService {
constructor( private  prisma: PrismaService){}

async create( title: string , price: number  ) {
    
    const  existingProduct = await this.prisma.product.findUnique({
      where: {
      title: title,
    }
    })
    if( existingProduct ){
      throw new AppError(409,'Product already exists');
    }
    try{
    const product =  await this.prisma.product.create({
      data: {
      title: title,
      price: price
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

  async update(id: number, data: {title?: string, price?: number} ) {

    const existingProduct = await this.prisma.product.findUnique({
    where: { id: id },
    select:{
    id: true,
    title: true,
    price: true
    }
    })
    if( !existingProduct ){
      throw new AppError(404,'Product not found');
    }

    try{
    const product =  await this.prisma.product.update({
      where:{
        id: id 
      },
      data,
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
      throw new AppError(404,'Product not found');
    }
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id }
    })
    return { message:'Product deleted successfully' };
  }

}