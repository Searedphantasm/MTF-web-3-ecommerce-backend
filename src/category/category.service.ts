import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(filterDto: GetCategoriesFilterDto): Promise<Category[]> {
    const { search } = filterDto;
    const query = this.categoryRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.sub_categories', 'sub_category');

    if (search) {
      query.andWhere('c.slug LIKE :search', {
        search: `%${search}%`,
      });
    }

    return await query.getMany();
  }

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoryRepository
      .createQueryBuilder('c')
      .where('c.id = :id', { id })
      .leftJoinAndSelect('c.sub_categories', 'sub_category')
      .getOne();

    if (!found) {
      throw new NotFoundException('Category not found');
    }

    return found;
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    const found = await this.categoryRepository
      .createQueryBuilder('c')
      .where('c.slug = :slug', { slug })
      .leftJoinAndSelect('c.sub_categories', 'sub_category')
      .getOne();

    if (!found) {
      throw new NotFoundException('Category not found');
    }

    return found;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { slug: createCategoryDto.slug },
    });

    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const { slug, description, name, image_key, image } = createCategoryDto;
    const category = this.categoryRepository.create({
      name,
      slug,
      description,
      image_key,
      image,
    });

    await this.categoryRepository.save(category);
    return category;
  }

  async updateCategory(
    id: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    const updatedCategory = await this.categoryRepository.update(
      id,
      createCategoryDto,
    );

    if (!updatedCategory.affected) {
      throw new NotFoundException(`Category not found: ${id}`);
    }
  }

  async deleteCategory(id: number): Promise<void> {
    const deleteResult = await this.categoryRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Category not found: ${id}`);
    }
  }
}
