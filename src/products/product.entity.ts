import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { SubCategory } from '../sub-categories/sub-category.entity';
import { Brand } from '../brands/brand.entity';
import { ProductSpecification } from '../product_specification/product_specification.entity';
import { ProductImage } from '../product_image/product_image.entity';

import { ProductReview } from './product-review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255, nullable: false })
  title: string;

  @Column({ unique: true, length: 255, nullable: false })
  slug: string;

  @Column('int', { nullable: false, default: 0 })
  rating: number;

  @Column('text', { nullable: false })
  poster: string;

  @Column({ length: 255, nullable: false })
  poster_key: string;

  @Column({ length: 255, nullable: false })
  alt_text: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: false })
  price: number;

  @Column('int', { nullable: false })
  product_stock: number;

  @Column('int', { nullable: true })
  product_discount_price: number;

  @Column('int', { nullable: true })
  product_discount_percentage: number;

  @Column({ default: ProductStatus.AVAILABLE })
  status: ProductStatus;

  @Column('text', { nullable: false })
  consumer_guide: string;

  @Column({ length: 11, nullable: true })
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => SubCategory, { cascade: true, eager: false })
  @JoinTable()
  sub_categories: SubCategory[];

  @ManyToOne(() => Brand, (brand) => brand.products, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(
    () => ProductSpecification,
    (productSpecification) => productSpecification.product,
    {
      nullable: false,
      onDelete: 'NO ACTION',
      cascade: true,
      eager: true,
    },
  )
  specifications: ProductSpecification[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    eager: true,
    nullable: false,
    onDelete: 'NO ACTION',
    cascade: true,
  })
  images: ProductImage[];

  @OneToMany(() => ProductReview, (productReview) => productReview.product, {
    cascade: true,
    nullable: true,
  })
  reviews: ProductReview[];

  @AfterUpdate()
  updateStock() {
    if (this.product_stock === 0) {
      this.status = ProductStatus.UNAVAILABLE;
    }
  }
}
