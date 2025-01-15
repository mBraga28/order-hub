import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

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
