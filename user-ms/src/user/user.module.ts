import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-ms',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-ms-consumer',
          },
        }}
    ])
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
