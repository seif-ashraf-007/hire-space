import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { SpaceStatus } from 'src/utils/enums';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('spaces')
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.spaces)
  owner_id: User;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @Column('simple-array', { nullable: true })
  photos: string[];

  @Column({
    type: 'enum',
    enum: SpaceStatus,
    default: SpaceStatus.UNDER_REVIEW,
  })
  status: SpaceStatus;

  @OneToMany(() => Room, (room) => room.space, { eager: true, cascade: true })
  rooms: Room[];

  @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
