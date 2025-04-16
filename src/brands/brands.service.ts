import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { ResponseInterface } from '../response.interface';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async getBrands(
    filterDto: GetBrandsFilterDto,
  ): Promise<ResponseInterface<Brand[]>> {
    const { search, page = '1', limit = '10' } = filterDto;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const query = this.brandRepository.createQueryBuilder('b');

    if (search) {
      query.andWhere('LOWER(b.slug) LIKE LOWER(:search) ', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await query
      .take(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .getManyAndCount();

    const result: ResponseInterface<Brand[]> = {
      data: data,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };

    return result;
  }

  async getBrandById(id: number): Promise<Brand> {
    const found = await this.brandRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('Brand not found');
    }

    return found;
  }

  async getBrandBySlug(slug: string): Promise<Brand> {
    const found = await this.brandRepository.findOne({ where: { slug } });

    if (!found) {
      throw new NotFoundException('Brand not found');
    }

    return found;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create({
      ...createBrandDto,
    });

    await this.brandRepository.save(brand);
    return brand;
  }

  async updateBrand(updateBrand: CreateBrandDto, id: number): Promise<void> {
    const updatedBrand = await this.brandRepository.update(id, updateBrand);

    if (!updatedBrand.affected) {
      throw new NotFoundException(`Category not found: ${id}`);
    }
  }

  async deleteBrand(id: number): Promise<void> {
    const deleteResult = await this.brandRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Brand not found: ${id}`);
    }
  }
}
