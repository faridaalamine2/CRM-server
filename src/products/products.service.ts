import { InjectModel } from '@nestjs/mongoose';
import { ProductsDto } from './products.dto';
import { Injectable } from '@nestjs/common';
import { Product, ProductsEnum } from './products.model';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      type: product.type,
      pricing: product.pricing,
      specs: product.specs,
    }));
  }

  async createProduct(props: ProductsDto): Promise<Product> {
    const name = props.name;
    const pricing = props.pricing;
    const specs = props.specs;
    const type = props.type;
    const item = new this.productModel({
      name: name,
      pricing: pricing,
      specs: specs,
      type: type,
    });

    const result = await item.save();
    return result;
  }
  async updateProduct(
    productId: string,
    name: string,
    type: ProductsEnum,
    pricing,
    specs
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (type) {
      updatedProduct.type = type;
    }
    if (pricing) {
      updatedProduct.pricing = pricing;
    }
    if (specs) {
      updatedProduct.specs = specs;
    }
    updatedProduct.save();
  }
  async deleteProduct(id: string): Promise<void> {
    await this.productModel.deleteOne({ _id: id }).exec();
    return;
  }
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find client.');
    }
    if (!product) {
      throw new NotFoundException('Could not find client.');
    }
    return product;
  }
}
