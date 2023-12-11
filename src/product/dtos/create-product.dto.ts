import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{

    @IsNumber()
    categoryId: number;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    lenght: number;

    @IsOptional()
    @IsNumber()
    height: number;

    @IsOptional()
    @IsNumber()
    width: number;

    @IsOptional()
    @IsNumber()
    diameter: number;



}