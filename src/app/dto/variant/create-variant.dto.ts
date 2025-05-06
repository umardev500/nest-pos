export class CreateVariantValueDTO {
  id: number;
  value: string;
}

export class CreateVariantDTO {
  name: string;
  values: CreateVariantValueDTO[];
}
