// import { ProductVariantDTO } from 'src/app/dto';
// import { unitData } from 'src/infra/prisma/seeders/unit.seeder';
// import { variantData } from 'src/infra/prisma/seeders/variant.seeder';

// function groupByType(
//   values: number[],
//   variantData,
// ): Record<string, Set<number>> {
//   const typeMap: Record<string, Set<number>> = {};

//   for (const id of values) {
//     const variant = variantData.find((v) =>
//       v.values.some((val) => val.id === id),
//     );
//     const type = variant?.name;
//     if (!type) continue;
//     if (!typeMap[type]) typeMap[type] = new Set();
//     typeMap[type].add(id);
//   }

//   return typeMap;
// }

// function isConflictingVariant(
//   existing: ProductVariantDTO[],
//   current: ProductVariantDTO,
//   variantData,
// ): boolean {
//   const currentGrouped = groupByType(
//     current.product_variant_values.map((v) => v.variant_value_id),
//     variantData,
//   );

//   return existing.some((existingVariant) => {
//     const existingGrouped = groupByType(
//       existingVariant.product_variant_values.map((v) => v.variant_value_id),
//       variantData,
//     );

//     return Object.keys(currentGrouped).every((type) => {
//       const currentValues = currentGrouped[type];
//       const existingValues = existingGrouped[type];

//       if (!existingValues) return false;

//       // Conflict if any overlap
//       return [...currentValues].some((val) => existingValues.has(val));
//     });
//   });
// }

// const pieceUnit = unitData.find((u) => u.name === 'Piece')!;
// const boxUnit = unitData.find((u) => u.name === 'Box')!;

// const beef = variantData
//   .find((v) => v.name === 'Flavor')!
//   .values.find((v) => v.value === 'Beef')!;

// const chicken = variantData
//   .find((v) => v.name === 'Flavor')!
//   .values.find((v) => v.value === 'Chicken')!;

// const duck = variantData
//   .find((v) => v.name === 'Flavor')!
//   .values.find((v) => v.value === 'Duck')!;

// const small = variantData
//   .find((v) => v.name === 'Size')!
//   .values.find((v) => v.value === 'Small')!;

// const large = variantData
//   .find((v) => v.name === 'Size')!
//   .values.find((v) => v.value === 'Large')!;

// const medium = variantData
//   .find((v) => v.name === 'Size')!
//   .values.find((v) => v.value === 'Medium')!;

// // Size Small nothing available with this data
// const productVariantDTO: ProductVariantDTO = {
//   unit_id: pieceUnit.id,
//   stock: 0,
//   price: 3300.5,
//   sku: 'CBG-PCS-BEEF',
//   barcode: '12345678',
//   product_variant_values: [
//     {
//       variant_value_id: chicken.id, // Referencing the 'Beef' variant
//     },
//     {
//       variant_value_id: beef.id, // Referencing the 'Chicken' variant
//     },
//     {
//       variant_value_id: duck.id, // Referencing the 'Chicken' variant
//     },
//     {
//       variant_value_id: small.id, // Referencing the small size
//     },
//   ],
// };

// const productVariantDTO2: ProductVariantDTO = {
//   unit_id: pieceUnit.id,
//   stock: 50,
//   price: 5000.5,
//   sku: 'CBG-PCX-BEEF',
//   barcode: '12345678',
//   product_variant_values: [
//     {
//       variant_value_id: chicken.id, // Referencing the 'Beef' variant
//     },
//     {
//       variant_value_id: beef.id, // Referencing the 'Chicken' variant
//     },
//     {
//       variant_value_id: large.id, // Referencing the large variant
//     },
//   ],
// };

// // Size Small will available withc just chicken
// const productVariantDTO3: ProductVariantDTO = {
//   unit_id: pieceUnit.id,
//   stock: 50,
//   price: 5000.5,
//   sku: 'CBG-PCX-CHICK',
//   barcode: '12345678',
//   product_variant_values: [
//     {
//       variant_value_id: chicken.id, // Referencing the 'Beef' variant
//     },
//     {
//       variant_value_id: medium.id, // Referencing the small variant
//     },
//   ],
// };

// const variantCandidates = [
//   productVariantDTO,
//   productVariantDTO2,
//   productVariantDTO3,
// ];
// const filteredVariants: ProductVariantDTO[] = [];

// for (const variant of variantCandidates) {
//   if (!isConflictingVariant(filteredVariants, variant, variantData)) {
//     filteredVariants.push(variant);
//   } else {
//     console.warn('⚠️ Skipping conflicting variant:', variant.sku);
//   }
// }
