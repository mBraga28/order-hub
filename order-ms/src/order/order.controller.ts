import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.create(createOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'Return all orders.' })
    async findAll() {
        return await this.orderService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiResponse({ status: 200, description: 'Return the order.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async findOne(@Param('id') id: string) {
      const orderId = parseInt(id, 10);
      return await this.orderService.findOne(orderId);
    }

    @Put(':id/complete')
    @ApiOperation({ summary: 'Complete an order by ID' })
    @ApiResponse({ status: 200, description: 'The order has been successfully completed.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async completeOrder(@Param('id') id: string) {
        const orderId = parseInt(id, 10);
        return await this.orderService.completeOrder(orderId);
    }

    @Put(':id/cancel')
    @ApiOperation({ summary: 'Cancel an order by ID' })
    @ApiResponse({ status: 200, description: 'The order has been successfully cancelled.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async cancelOrder(@Param('id') id: string) {
        const orderId = parseInt(id, 10);
        return await this.orderService.cancelOrder(orderId);
    }

}
