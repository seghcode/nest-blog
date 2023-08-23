import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private postsService: PrismaService) {}

  // create post
  create(createPostDto: Prisma.PostCreateInput) {
    return this.postsService.post.create({ data: createPostDto });
  }

  // find all post
  findAll(userId: string, query?: Prisma.PostInclude) {
    return this.postsService.post.findMany({
      where: { userId },
      include: query,
    });
  }

  // get a single post
  async findOne(id: string): Promise<any> {
    const findOnePost = await this.postsService.post.findUnique({
      where: { id },
    });
    if (!findOnePost) throw new NotFoundException('Post not found');
    return findOnePost;
  }

  // update a post
  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.postsService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  // delete a task
  remove(id: string) {
    return this.postsService.post.delete({ where: { id } });
  }
}
