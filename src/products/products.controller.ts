import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './products.dto';
import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();

    return products;
  }

  @Post()
  async createProduct(@Body() productDto: ProductsDto) {
    const result = await this.productsService.createProduct(productDto);

    return result;
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() productDto: ProductsDto
  ) {
    await this.productsService.updateProduct(
      productId,
      productDto.name,
      productDto.type,
      productDto.pricing,
      productDto.specs
    );
    return null;
  }
  @Delete(':id')
  async removeClient(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return null;
  }
}
