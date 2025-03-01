import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubCategory } from './sub-category.entity';
import { GetSubCategoriesFilterDto } from './dto/get-sub-categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    private categoryService: CategoryService,
  ) {}

  async getSubCategories(
    filterDto: GetSubCategoriesFilterDto,
  ): Promise<SubCategory[]> {
    const { search, category } = filterDto;
    const query = this.subCategoryRepository.createQueryBuilder('sc');

    if (search) {
      query.andWhere('sc.slug LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category) {
      const cateID = parseInt(category);
      if (isNaN(cateID)) {
        query
          .innerJoin('sc.parent_category', 'pc')
          .andWhere('pc.slug LIKE :category', {
            category: `%${category}%`,
          });
      } else {
        query.andWhere('sc.parent_category_id = :cateID ', {
          cateID,
        });
      }
    }

    return await query.getMany();
  }

  async getSubCategoryById(id: number): Promise<SubCategory> {
    const found = await this.subCategoryRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`SubCategory with id ${id} not found`);
    }

    return found;
  }

  async getSubCategoryBySlug(slug: string): Promise<SubCategory> {
    const found = await this.subCategoryRepository.findOne({ where: { slug } });

    if (!found) {
      throw new NotFoundException(`SubCategory with slug ${slug} not found`);
    }

    return found;
  }

  async createSubCategory(
    createSubCategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const existing = await this.subCategoryRepository.findOne({
      where: { slug: createSubCategory.slug },
    });
    if (existing) {
      throw new BadRequestException(`SubCategory Already exists`);
    }

    const { parent_category_id, image_key, image, slug, description, name } =
      createSubCategory;

    const subCategory = this.subCategoryRepository.create({
      name,
      description,
      slug,
      image_key,
      image,
    });

    subCategory.parent_category =
      await this.categoryService.getCategoryById(parent_category_id);

    await this.subCategoryRepository.save(subCategory);
    return subCategory;
  }

  async updateSubCategory(
    updateSubCategory: CreateSubCategoryDto,
    id: number,
  ): Promise<void> {
    const { parent_category_id, image_key, image, slug, description, name } =
      updateSubCategory;
    const subCategory = await this.getSubCategoryById(id);

    subCategory.parent_category =
      await this.categoryService.getCategoryById(parent_category_id);
    subCategory.image_key = image_key;
    subCategory.name = name;
    subCategory.description = description;
    subCategory.slug = slug;
    subCategory.image = image;

    await this.subCategoryRepository.save(subCategory);
  }

  async deleteSubCategory(id: number): Promise<void> {
    const deleteRes = await this.subCategoryRepository.delete(id);

    if (!deleteRes.affected) {
      throw new NotFoundException(`SubCategory with id ${id} not found`);
    }
  }
}
