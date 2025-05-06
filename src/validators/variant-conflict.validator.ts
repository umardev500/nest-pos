// src/common/validators/variant-conflict.validator.ts

import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductVariantDTO, ProductVariantValueDTO } from 'src/app/dto';

// Helper function to check if a variant set is a subset of another
function isSubset(
  set1: ProductVariantValueDTO[],
  set2: ProductVariantValueDTO[],
): boolean {
  // Check if each value in set1 exists in set2
  return set1.every((val1) =>
    set2.some(
      (val2) =>
        val1.value === val2.value &&
        val1.variant_type_id === val2.variant_type_id,
    ),
  );
}

function findVariantConflicts(
  variants: ProductVariantDTO[],
): ProductVariantDTO[] {
  const conflicts: ProductVariantDTO[] = [];

  // Compare each pair of variants
  for (let i = 0; i < variants.length; i++) {
    for (let j = i + 1; j < variants.length; j++) {
      const variant1 = variants[i];
      const variant2 = variants[j];

      // Check if variant1 is a subset of variant2 or vice versa
      if (
        isSubset(
          variant1.product_variant_values,
          variant2.product_variant_values,
        )
      ) {
        conflicts.push(variant2); // Flag variant2 as conflicting
      }
      if (
        isSubset(
          variant2.product_variant_values,
          variant1.product_variant_values,
        )
      ) {
        conflicts.push(variant1); // Flag variant1 as conflicting
      }
    }
  }

  // Remove duplicates from conflicts
  return [...new Set(conflicts)];
}

@ValidatorConstraint({ async: false })
@Injectable()
export class VariantConflictValidator implements ValidatorConstraintInterface {
  validate(variants: ProductVariantDTO[], args: ValidationArguments): boolean {
    const conflicts = findVariantConflicts(variants);
    console.log(conflicts);

    if (conflicts.length > 0) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Product variants have conflicts in variant values (e.g., identical variant values for the same variant type).';
  }
}
