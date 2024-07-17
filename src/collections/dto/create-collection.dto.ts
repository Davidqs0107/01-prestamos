import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  collectionDate: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  paymentId: string;

  @IsString()
  userId: string;
}
