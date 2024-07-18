import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ClientModule } from './client/client.module';
import { LoansModule } from './loans/loans.module';
import { PaymentModule } from './payment/payment.module';
import { CollectionsModule } from './collections/collections.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,

    }),
    UserModule,
    CommonModule,
    ClientModule,
    LoansModule,
    PaymentModule,
    CollectionsModule,
    AuthModule],
})
export class AppModule { }
