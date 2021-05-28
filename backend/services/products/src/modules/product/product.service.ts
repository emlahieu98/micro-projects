import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProductDTO } from 'src/models/product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
@Injectable()
export class ProductService {
  
  constructor(
     @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  )    
  { }
  async getAllProducts() {
    return this.productRepo.find()
  }
  async getProductById(id:number) {
    return await this.productRepo.findOne(id);
  }
  async createProduct(product: createProductDTO) {
    console.log(2, product);
    
    const result = this.productRepo.create(product);
        await this.productRepo.save(product);
        return result;
  }
}
