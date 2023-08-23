import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from '../auth/guards/local-auth/jwt-auth.guard';
import { getProfile } from '../auth/guards/local-auth/profile.guard';
import { User } from '.prisma/client';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from '../util';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@getProfile() user: User, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories.map((category) => ({
      id: category,
    }));

    return this.postsService.create({
      ...createPostDto,
      author: { connect: { id: user.id } },
      categories: { connect: categories },
    });
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query() query: PostQueryDto, @getProfile() user: User) {
    return this.postsService.findAll(user.id, isEmpty(query) ? null : query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories.map((category) => ({
      id: category,
    }));

    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
