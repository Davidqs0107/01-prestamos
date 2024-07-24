import { IsString } from "class-validator";

export class JwtAuthDto {
    @IsString()
    id: string
}