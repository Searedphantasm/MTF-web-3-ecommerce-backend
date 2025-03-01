import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  url: string;

  @Column({ nullable: false, length: 255 })
  url_key: string;

  @Column({ nullable: false, length: 255 })
  alt_text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Product, (product) => product.images, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
