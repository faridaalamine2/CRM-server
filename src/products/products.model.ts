import * as mongoose from 'mongoose';

export class PricingModel {
  quantity: number;
  cost: number;
}

export interface ProductSpecsModel {
  key: string;
  value: string;
}

export enum ProductsEnum {
  businessCards = 'businessCards',
  flyers = 'flyers',
}

export const ProductsSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  specs: { type: Array },
  pricing: { type: Array },
});

export interface Product extends mongoose.Document {
  id: number;
  name: string;
  type: ProductsEnum;
  specs: Array<ProductSpecsModel>;
  pricing: Array<PricingModel>;
}
