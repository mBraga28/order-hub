import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    readonly productName: string;

    @IsString()
    readonly price: number;

    @IsNumber()
    readonly quantity: number;
    
    @IsString()
    readonly status: string;

}