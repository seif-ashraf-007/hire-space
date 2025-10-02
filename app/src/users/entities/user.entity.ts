import { Exclude } from 'class-transformer';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Space } from 'src/spaces/entities/space.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { UserRole } from 'src/utils/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
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

  @Column({ nullable: true, default: null, type: 'varchar', length: 255 })
  verification_token: string | null;

  @Column({ nullable: true, default: null, type: 'varchar', length: 255 })
  reset_password_token: string | null;

  @OneToMany(() => Space, (space) => space.owner_id, {
    eager: true,
    cascade: true,
  })
  spaces: Space[];

  @OneToMany(() => Booking, (booking) => booking.user, {
    eager: true,
    cascade: true,
  })
  bookings: Booking[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
