import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductColorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  code: string;

  @Column({ nullable: false, length: 100 })
  rgb_code: string;

  @Column('int', { nullable: true })
  stock: number;

  @ManyToOne(() => Product, (product) => product.colors)
  product: Product;

  @Column()
  status: boolean;
}
