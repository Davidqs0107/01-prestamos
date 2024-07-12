import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    CommonModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule, ClientService]
})
export class ClientModule { }
