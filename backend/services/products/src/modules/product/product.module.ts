import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { ProductEntity } from "../../entities/product.entity"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from "./product.service"

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ProductModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
