import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserDto {
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
    @MinLength(6)
    password: string

}
