import { Module } from '@nestjs/common';
import { ProductSpecificationService } from './product_specification.service';
import { ProductSpecification } from './product_specification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpecification])],
  providers: [ProductSpecificationService],
  exports: [ProductSpecificationService],
})
export class ProductSpecificationModule {}
