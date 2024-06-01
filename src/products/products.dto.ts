import {
  ProductSpecsModel,
  ProductsEnum,
  PricingModel,
} from './products.model';

export class ProductsDto {
  name: string;
  type: ProductsEnum;
  specs: Array<ProductSpecsModel>;
  pricing: Array<PricingModel>;
}
