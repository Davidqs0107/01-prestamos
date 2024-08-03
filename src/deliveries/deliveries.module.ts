import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { CollectionsModule } from 'src/collections/collections.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    CommonModule,
    CollectionsModule
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [TypeOrmModule, DeliveriesService]
})
export class DeliveriesModule { }
