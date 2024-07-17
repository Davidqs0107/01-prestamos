import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])
    , PaymentModule
    , UserModule],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [TypeOrmModule]
})
export class CollectionsModule { }
