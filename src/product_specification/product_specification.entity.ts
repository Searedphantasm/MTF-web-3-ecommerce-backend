import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class ProductSpecification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  spec_title: string;

  @Column({ length: 255, nullable: false })
  spec_description: string;

  @ManyToOne(() => Product, (product) => product.specifications, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
