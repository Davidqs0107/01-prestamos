import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { LoansModule } from 'src/loans/loans.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    LoansModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [TypeOrmModule, PaymentService]
})
export class PaymentModule { }
