import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.addresses, { eager: false })
  user: User;

  @Column({ type: 'varchar', length: 255, nullable: false })
  postal_code: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  landline: string;

  @Column({ nullable: false, type: 'text' })
  address: string;

  @Column({ nullable: false, type: 'text' })
  address_detail: string;

  @Column({ nullable: true })
  isDefault: boolean;
}
