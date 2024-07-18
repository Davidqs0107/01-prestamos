import { Payment } from 'src/payment/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  collectionDate: Date;

  @Column({
    type: 'decimal',
    default: 0.0,
  })
  amount: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'text' })
  paymentId: string;

  @Column({ type: 'text' })
  userId: string;

  @ManyToOne(() => Payment, (payment) => payment.collection)
  payment: Payment;

  @ManyToOne(() => User, (user) => user.collection)
  user: User;
}
