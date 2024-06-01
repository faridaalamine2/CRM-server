import { Controller } from '@nestjs/common';
import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Controller('getContents')
export class ContentController {
  constructor(
    private contentService: ContentService,
    public productsService: ProductsService,
    public usersService: UsersService
  ) {}

  @Get()
  async getContents(): Promise<any> {
    const products = await this.productsService.getAllProducts();
    const users = await this.usersService.getUsers();

    return { products, users };
  }
}
