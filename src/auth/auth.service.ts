import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  // validate user
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user || user.password !== password) return false;
      return user;
    } catch (err) {
      console.log(err); // add console.log statement to see the error message
      throw new Error('Error validating user'); // throw a new error
    }
  }

  // login user
  async signIn(user: User) {
    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
    return { access_token: access_token };
  }

  // register user
  async registerUser(createUserDto: CreateUserDto) {
    const signup = await this.userService.create(createUserDto);
    return this.signIn(signup);
  }
}
