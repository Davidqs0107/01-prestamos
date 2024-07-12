import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { CommonModule } from 'src/common/common.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    CommonModule,
    ClientModule
  ],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [TypeOrmModule]
})
export class LoansModule { }
