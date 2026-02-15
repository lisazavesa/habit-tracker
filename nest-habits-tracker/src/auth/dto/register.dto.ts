import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}
// export class UpdateHabitDto {
//     @IsString()
//     @IsOptional()
//     @MaxLength(100)
//     title?: string;

//     @IsString()
//     @IsOptional()
//     @MaxLength(500)
//     description?: string;

//     @IsBoolean()
//     @IsOptional()
//     isActive?: boolean
// }