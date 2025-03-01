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
import { SubCategoriesService } from './sub-categories.service';
import { GetSubCategoriesFilterDto } from './dto/get-sub-categories.dto';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategory } from './sub-category.entity';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get()
  getSubCategories(
    @Query() filterDto: GetSubCategoriesFilterDto,
  ): Promise<SubCategory[]> {
    return this.subCategoryService.getSubCategories(filterDto);
  }

  @Get('/:id')
  getSubCategory(@Param('id') id: string): Promise<SubCategory> {
    const parsedID = parseInt(id);
    if (isNaN(parsedID)) {
      return this.subCategoryService.getSubCategoryBySlug(id);
    }
    return this.subCategoryService.getSubCategoryById(parsedID);
  }

  @Post()
  createSubCategory(
    @Body() createSubCategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoryService.createSubCategory(createSubCategory);
  }

  @Put('/:id')
  updateSubCategory(
    @Body() updateSubCategoryDto: CreateSubCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.subCategoryService.updateSubCategory(updateSubCategoryDto, id);
  }

  @Delete('/:id')
  deleteSubCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subCategoryService.deleteSubCategory(id);
  }
}
