import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrderService {


  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.order.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({ 
      where: { id } 
    });
  }

  async create(data: CreateOrderDto) {
    const order = await this.prisma.order.create({ data });

    await this.updateStatus(order.id, 'processing');

    return order;
  }

  async updateStatus(id: number, status: string) {
    return await this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async completeOrder(id: number) {
    const order = await this.updateStatus(id, 'completed');
    this.sendNotification(order);
    return order;
  }

  async cancelOrder(id: number) {
    const order = await this.updateStatus(id, 'cancelled');
    this.sendNotification(order);
    return order;
  }

  private sendNotification(order: any) {
    console.log(`Notification: Order ${order.id} is now ${order.status}`);
  }
}

