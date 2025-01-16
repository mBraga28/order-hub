import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @ApiProperty()
    readonly productName: string;

    @IsString()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @ApiProperty()
    readonly quantity: number;
    
    @IsString()
    readonly status: string;

}