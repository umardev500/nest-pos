// src/validators/isNotUserInput.ts
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// Custom decorator to prevent user input for a specific field
export function IsNotUserInput(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotUserInput',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Return false if value is set (i.e., user shouldn't provide it)
          return value === undefined || value === null;
        },
        defaultMessage(args: ValidationArguments) {
          // Custom error message when validation fails
          return `${args.property} should not be provided by the user. It will be set internally.`;
        },
      },
    });
  };
}
