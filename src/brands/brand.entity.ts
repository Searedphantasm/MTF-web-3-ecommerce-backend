import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  logo: string;

  @Column({ length: 255, nullable: false })
  logo_key: string;

  @Column({ length: 255, nullable: false })
  country: string;

  @Column({ length: 255, nullable: false })
  website_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
