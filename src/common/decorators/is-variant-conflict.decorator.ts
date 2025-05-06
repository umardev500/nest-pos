import { registerDecorator, ValidationOptions } from 'class-validator';
import { VariantConflictValidator } from 'src/validators';

export function IsVariantConflict(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: VariantConflictValidator,
    });
  };
}
