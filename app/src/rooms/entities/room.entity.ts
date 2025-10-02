import { Booking } from 'src/bookings/entities/booking.entity';
import { Space } from 'src/spaces/entities/space.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { RoomStatus } from 'src/utils/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  // Many-to-one relationship with Space
  @ManyToOne(() => Space, (space) => space.rooms)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1 })
  capacity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_per_hour: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('simple-array', { nullable: true })
  photos: string[];

  @Column('simple-array', { nullable: true })
  rules: string[];

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;

  @OneToMany(() => Booking, (booking) => booking.room, {
    eager: true,
    cascade: true,
  })
  bookings: Booking[];

  @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
