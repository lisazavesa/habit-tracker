import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateHabitDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}
