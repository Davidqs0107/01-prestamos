import { IsNumber, IsOptional } from "class-validator"

export class PaginateDto {
    @IsNumber()
    @IsOptional()
    limit?: number
    @IsNumber()
    @IsOptional()
    skip?: number
}