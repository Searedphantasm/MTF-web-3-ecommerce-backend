import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategory } from '../sub-categories/sub-category.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    length: 255,
    nullable: false,
  })
  slug: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  image: string;

  @Column({
    nullable: false,
    length: 255,
  })
  image_key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.parent_category, {
    eager: false,
    onDelete: 'RESTRICT',
  })
  sub_categories: SubCategory[];
}
