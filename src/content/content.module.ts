import { Module } from '@nestjs/common';
import { ProductsController } from 'src/products/products.controller';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
