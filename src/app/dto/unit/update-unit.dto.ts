import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUnitDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  merchant_id?: number;
}
