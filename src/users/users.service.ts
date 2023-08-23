import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // create new user
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  // get all users
  findAll() {
    return this.prismaService.user.findMany({ include: { posts: true } });
  }

  // get one user by email
  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  // get a single user
  async findOne(id: string) {
    const singleUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!singleUser) throw new NotFoundException(`No User With This Id: ${id}`);
    return singleUser;
  }

  // update user
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  // delete a user
  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
