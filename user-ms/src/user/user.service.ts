import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { Kafka, Partitioners } from 'kafkajs';

@Injectable()
export class UserService implements OnModuleInit {

    private kafkaConsumer;
    private kafkaProducer;

    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {
        const kafka = new Kafka({
            brokers: ['localhost:9092'],
        });

        this.kafkaProducer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        });
        await this.kafkaProducer.connect();

        this.kafkaConsumer = kafka.consumer({ groupId: 'user-ms-consumer' });
        await this.kafkaConsumer.connect();
        await this.kafkaConsumer.subscribe({ topic: 'order-events', fromBeginning: true });
        await this.kafkaConsumer.run({ 
            eachMessage: async ({ topic, partition, message }) => {
               try {
                    const event = JSON.parse(message.value.toString());
                    if (event.event === 'ORDER_CREATED') {
                        console.log('Processing new order in user-service:', event.order);
                        await this.create(event.order);
                    } else if (event.event === 'GET_ALL_ORDERS') {
                        if (Array.isArray(event.orders)) {
                            console.log('Processing orders list in user-service:');
                            event.orders.forEach(order => {
                              console.log('Order:', order);
                            });
                          } else {
                            console.error('Orders is not an array:', event.orders);
                          }
                    }
               } catch (error) {
                    console.error('Failed to parse message:', message.value.toString());
                    console.error('Error:', error);
               }
            }
        });

    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: string) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async create(createUserDto: CreateUserDto){
        return await this.prisma.user.create({ data: createUserDto });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({ where: { id }, data: updateUserDto });
    }

    async remove(id: string) {
        return await this.prisma.user.delete({ where: { id } });
    }
}
