import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtGuard } from './guards/local-auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { getProfile } from './guards/local-auth/profile.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   login
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  //   profile
  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@getProfile() user: User) {
    return user;
  }

  //   register
  @Post('signup')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
