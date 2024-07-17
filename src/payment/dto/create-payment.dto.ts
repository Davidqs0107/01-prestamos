import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreatePaymentDto {
    @IsNumber()
    @Min(1)
    amount: number
    @IsNumber()
    @IsOptional()
    paid: number

    @IsString()
    dueDate: string

    @IsString()
    loanId: string
}
