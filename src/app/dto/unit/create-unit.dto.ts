import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  merchant_id: number;
}
