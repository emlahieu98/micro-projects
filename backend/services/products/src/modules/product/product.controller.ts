
import { Body, Controller, Get, Post, Put, ValidationPipe, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDTO } from 'src/models/product.dto';
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) { }
 
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
 
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }
 
  @Post()
  async createProduct(@Body() product: createProductDTO) {
     return this.productService.createProduct(product);
  }
 
  // @Put(':id')
  // async replaceproduct(@Param('id') id: string, @Body() product: UpdateproductDto) {
  //   return this.productService.replaceproduct(Number(id), product);
  // }
 
  // @Delete(':id')
  // async deleteproduct(@Param('id') id: string) {
  //   this.productService.deleteproduct(Number(id));
  // }

}
