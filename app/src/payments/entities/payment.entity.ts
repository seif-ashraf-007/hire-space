import { Booking } from 'src/bookings/entities/booking.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import { PaymentStatus } from 'src/utils/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, { eager: true, onDelete: 'CASCADE' })
  booking: Booking;

  @Column({ type: 'varchar', length: 255 })
  stripe_payment_intent_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
