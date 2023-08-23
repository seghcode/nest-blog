import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private categoryService: PrismaService) {}

  // create category
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryService.category.create({ data: createCategoryDto });
  }

  // get all categories
  findAll(query?: Prisma.CategoryInclude) {
    return this.categoryService.category.findMany({ include: query });
  }

  // get one category
  findOne(id: string) {
    return this.categoryService.category.findUnique({ where: { id } });
  }

  // update a category
  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.category.update({
      data: updateCategoryDto,
      where: { id },
    });
  }

  // delete category
  remove(id: string) {
    return this.categoryService.category.delete({ where: { id } });
  }
}
