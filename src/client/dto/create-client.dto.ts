import { IsString, MinLength, IsEmail, IsOptional } from "class-validator"

export class CreateClientDto {

    @IsString()
    @MinLength(2)
    name: string
    @IsString()
    @MinLength(2)
    lastName: string
    @IsString()
    @MinLength(4)
    phone: string
    @IsString()
    ci: string
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    address?: string

    @IsString()
    @IsOptional()
    lat?: string

    @IsString()
    @IsOptional()
    lng?: string

}
