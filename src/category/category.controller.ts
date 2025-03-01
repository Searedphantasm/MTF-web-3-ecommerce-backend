import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(
    @Query() filterDto: GetCategoriesFilterDto,
  ): Promise<Category[]> {
    return this.categoryService.getCategories(filterDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    const parsedID = parseInt(id);
    if (isNaN(parsedID)) {
      return this.categoryService.getCategoryBySlug(id);
    }
    return this.categoryService.getCategoryById(parsedID);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/:id')
  updateCategory(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<void> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
