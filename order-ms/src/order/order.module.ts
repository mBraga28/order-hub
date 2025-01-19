import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
      ClientsModule.register([
      {  
        name: 'ORDER_MS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-ms',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'order-ms-consumer',
          },
        },
      }, 
    ]),
  ],
    controllers: [OrderController],
    providers: [OrderService, PrismaService],
  })
  export class OrderModule {}