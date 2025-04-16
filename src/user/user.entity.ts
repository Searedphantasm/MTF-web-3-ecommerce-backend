import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', length: 255, nullable: true, unique: true })
  username: string;

  @Column({ length: 255, nullable: true })
  first_name: string;

  @Column({ length: 255, nullable: true })
  last_name: string;

  @Column({ length: 255, nullable: true, unique: true })
  email: string;

  @Column({ length: 11, nullable: false, unique: true })
  phone: string;

  @Column('boolean', { default: true })
  active: boolean;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user, {
    eager: false,
    nullable: true,
  })
  addresses: UserAddress[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
