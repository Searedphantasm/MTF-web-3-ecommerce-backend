import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  image: string;

  @Column({ nullable: false })
  image_key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.sub_categories, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'parent_category_id' })
  parent_category: Category;
}
