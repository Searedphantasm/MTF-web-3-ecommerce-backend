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
import { BrandsService } from './brands.service';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './brand.entity';
import { ResponseInterface } from '../response.interface';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  getBrands(
    @Query() brandsFilterDto: GetBrandsFilterDto,
  ): Promise<ResponseInterface<Brand[]>> {
    return this.brandService.getBrands(brandsFilterDto);
  }

  @Get('/:id')
  getBrand(@Param('id') id: string): Promise<Brand> {
    const parsedID = parseInt(id, 10);
    if (isNaN(parsedID)) {
      return this.brandService.getBrandBySlug(id);
    }
    return this.brandService.getBrandById(parsedID);
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandService.createBrand(createBrandDto);
  }

  @Put('/:id')
  updateBrand(
    @Body() updateBrand: CreateBrandDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.brandService.updateBrand(updateBrand, id);
  }

  @Delete('/:id')
  deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.brandService.deleteBrand(id);
  }
}
