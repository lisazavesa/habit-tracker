import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateHabitDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}