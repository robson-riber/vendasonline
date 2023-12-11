import { ProductEntity } from "src/product/entities/product.entity";

export class SizeProductDto{

    weight: number;
    length: number;
    height: number;
    width: number;
    diameter: number;
    productValue: number;

  constructor(product: ProductEntity) {
    this.weight = product.weight;
    this.length = product.lenght;
    this.height = product.height;
    this.width = product.width;
    this.diameter = product.diameter;
    this.productValue = product.price;
  }
}