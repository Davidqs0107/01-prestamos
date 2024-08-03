import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateDeliveryDto {
    @IsString()
    deliveryDate: string
    @IsNumber()
    amount: number

    @IsString()
    @IsOptional()
    note?: string

    @IsString()
    collectionId: string
}
