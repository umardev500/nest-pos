import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsNotUserInput } from 'src/validators';

export class CreateCustomerDto {
  @IsOptional()
  @IsNotUserInput({
    message: 'Merchant ID should not be provided by the user.',
  })
  @IsInt()
  @Type(() => Number)
  merchant_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('ID') // You can use a specific region like 'US' if needed
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
