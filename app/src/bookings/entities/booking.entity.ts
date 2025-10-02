import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { BookingStatus } from 'src/utils/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'date' })
  booking_date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  platform_fee: number;

  @Column('decimal', { precision: 10, scale: 2 })
  final_price: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hold_token: string;

  @Column({ type: 'timestamp', nullable: true })
  hold_token_expires_at: Date;

  @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
