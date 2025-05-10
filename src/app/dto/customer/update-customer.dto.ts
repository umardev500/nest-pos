import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  level_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('ID')
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  points?: number;
}
