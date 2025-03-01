import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './sub-category.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory]), CategoryModule],
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
