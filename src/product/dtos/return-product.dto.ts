import { ReturnCategory } from "src/categoty/dtos/return-category.dto";
import { ProductEntity } from "../entities/product.entity";

export class ReturnProduct{

    id: number;
    name: string;
    price: number;
    image: string;
    weight: number
    lenght: number
    height: number
    width: number
    diameter: number

    category?: ReturnCategory;

    constructor(productEntity: ProductEntity){
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.price = productEntity.price;
        this.image = productEntity.image;
        this.weight = productEntity.weight;
        this.lenght = productEntity.lenght;
        this.height = productEntity.height;
        this.width = productEntity.width;
        this.diameter = productEntity.diameter;

        this.category = productEntity.category ? new ReturnCategory(productEntity.category) : undefined;

    }
}