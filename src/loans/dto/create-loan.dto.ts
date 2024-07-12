import { IsNumber, IsString, Min } from "class-validator"

export class CreateLoanDto {
    @IsNumber()
    @Min(1)
    amount: number
    @IsNumber()
    @Min(1)
    interestRate: number
    @IsNumber()
    @Min(1)
    totalAmount: number
    @IsString()
    clientId: string
}
