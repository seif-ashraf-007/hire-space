import { Exclude } from 'class-transformer';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { UserRole } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: '150' })
  email: string;

  @Column({ type: 'varchar', length: '18' })
  first_name: string;

  @Column({ type: 'varchar', length: '18', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: '16', nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'boolean', default: true })
  email_verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ nullable: true, default: null, type: 'varchar' })
  verificationToken: string | null;

  @Column({ nullable: true, default: null, type: 'varchar' })
  resetPasswordToken: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
