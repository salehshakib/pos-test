import { generateRandomCode } from '../generateCode';

export function formatProductData(data, productName, sku) {
  return (
    data
      // .filter((item) => item.name.includes(productName))
      .map((item) => {
        return {
          key: item.name.split(productName)[1].trim(),
          name: item.name.split(productName)[1].trim(),
          sku: item.sku.split(sku + '-')[1].trim(),
          iemi: item.imei_number ?? '',
          price: item.selling_price,
          cost: item.buying_price,
          variant_options: item.product_variant_attribute_options.reduce(
            (acc, option) => {
              const attribute = option.attribute_option.attribute;
              const existingAttr = acc.find(
                (attr) => attr.attribute_id === attribute.id
              );

              if (existingAttr) {
                existingAttr.options.push({
                  id: option.attribute_option.id,
                  attribute_id: option.attribute_option.attribute_id,
                  name: option.attribute_option.name,
                  created_at: option.attribute_option.created_at,
                  updated_at: option.attribute_option.updated_at,
                  deleted_at: option.attribute_option.deleted_at,
                });
              } else {
                acc.push({
                  attribute_id: attribute?.id,
                  attribute_name: attribute.name,
                  options: [
                    {
                      id: option.attribute_option.id,
                      attribute_id: option.attribute_option.attribute_id,
                      name: option.attribute_option.name,
                      created_at: option.attribute_option.created_at,
                      updated_at: option.attribute_option.updated_at,
                      deleted_at: option.attribute_option.deleted_at,
                    },
                  ],
                });
              }

              return acc;
            },
            []
          ),
        };
      })
  );
}

export function formatVariantsData(variants, attributes) {
  const attributesMap = {};

  variants?.forEach((variant) => {
    variant?.product_variant_attribute_options?.forEach((option) => {
      const { attribute_id, attribute } = option.attribute_option;

      if (!attributesMap?.[attribute_id]) {
        attributesMap[attribute_id] = {
          key: attribute_id.toString(),
          id: attribute_id.toString(),
          name: attribute?.name,
          options: attributes?.find(
            (item) => item.id.toString() === attribute_id.toString()
          ).attribute_options,
        };
      }
    });
  });

  return Object.values(attributesMap).reverse();
}

export function extractAttributeValues(attributeData) {
  const attributeValues = {};
  const attributeIds = {};

  attributeData.forEach((product) => {
    product.product_variant_attribute_options.forEach((variant) => {
      const attributeId = variant.attribute_option.attribute_id;
      const attributeName = variant.attribute_option.name;
      const optionId = variant.attribute_option.id.toString();

      // Add attribute value to the values object
      if (!attributeValues[attributeId]) {
        attributeValues[attributeId] = [];
      }
      if (!attributeValues[attributeId].includes(attributeName)) {
        attributeValues[attributeId].push(attributeName);
      }

      // Add attribute option ID to the IDs object
      if (!attributeIds[attributeId]) {
        attributeIds[attributeId] = [];
      }
      if (!attributeIds[attributeId].includes(optionId)) {
        attributeIds[attributeId].push(optionId);
      }
    });
  });

  return { attributeValues, attributeIds };
}

export const updateVariantOptions = (
  dataSource,
  variantOptions,
  variantAttributesName
) => {
  const validIds = dataSource.map((item) => item?.id?.toString());

  Object.keys(variantOptions).forEach((id) => {
    if (!validIds.includes(id.toString())) {
      variantOptions[id] = [];
      variantAttributesName[id] = [];
    }
  });
};

export function getUniqueAttributeIds(variants) {
  const attributeIds = new Set();

  variants.forEach((variant) => {
    variant.product_variant_attribute_options.forEach((option) => {
      attributeIds.add(option.attribute_option.attribute_id.toString());
    });
  });

  // Convert the set to an array to get unique attribute_ids
  return Array.from(attributeIds);
}

// export const generateCombinationsFromVariantAttributes = (
//   dataSource,
//   variantAttributesName,
//   buying_price,
//   selling_price
// ) => {
//   // Return an empty array if dataSource or variantAttributesName is empty
//   if (
//     !dataSource.length ||
//     Object.keys(variantAttributesName).length === 0 ||
//     Object.values(variantAttributesName).every((values) => values.length === 0)
//   ) {
//     return [];
//   }

//   // Create an ordered array of attribute ids from dataSource
//   const orderedAttributeIds = dataSource.map((item) => item.id);
//   const options = dataSource.flatMap((item) => item.options);

//   console.log(variantAttributesName);

//   console.log(dataSource);

//   function filterOptions(options, filter) {
//     return options.filter((option) => {
//       const attributeValues = filter[option.attribute_id];
//       return attributeValues && attributeValues.includes(option.name);
//     });
//   }

//   const orderedAttributesOptions = filterOptions(
//     options,
//     variantAttributesName
//   );

//   console.log(orderedAttributesOptions);

//   const combinations = [];

//   const combine = (index, current) => {
//     // If the current combination is the same length as the ordered attribute ids, add to results
//     if (index === orderedAttributeIds.length) {
//       const combinationName = current.join(' ');
//       combinations.push({
//         name: combinationName,
//         cost: buying_price, // Set cost for the combination
//         price: selling_price, // Set price for the combination
//         sku: generateRandomCode(6), // Generate a random SKU
//         variant_options: orderedAttributesOptions,
//       });
//       return;
//     }

//     const key = orderedAttributeIds[index];
//     const values = variantAttributesName[key]; // Get values for the current key

//     // Check if there are values for the current key
//     if (values && values.length > 0) {
//       for (const value of values) {
//         current.push(value); // Add current value to combination
//         combine(index + 1, current); // Move to the next key
//         current.pop(); // Backtrack to try another value
//       }
//     } else {
//       // If no values, just move to the next key
//       combine(index + 1, current);
//     }
//   };

//   combine(0, []);
//   return combinations;
// };

// export const generateCombinationsFromVariantAttributes = (
//   dataSource,
//   variantAttributesName,
//   buying_price,
//   selling_price
// ) => {
//   if (!dataSource.length ||
//       Object.keys(variantAttributesName).length === 0 ||
//       Object.values(variantAttributesName).every(values => values.length === 0)) {
//     return [];
//   }

//   const orderedAttributeIds = dataSource.map(item => item.id);
//   const options = dataSource.flatMap(item => item.options);

//   const filterOptions = (options, filter) =>
//     options.filter(option => filter[option.attribute_id]?.includes(option.name));

//   const orderedAttributesOptions = filterOptions(options, variantAttributesName);

//   const combinations = [];

//   const combine = (index, current) => {
//     if (index === orderedAttributeIds.length) {
//       const combinationName = current.join(' ');
//       const variantAttributeIds = current.map(name =>
//         orderedAttributesOptions.find(option => option.name === name)?.id
//       );
//       combinations.push({
//         name: combinationName,
//         cost: buying_price,
//         price: selling_price,
//         sku: generateRandomCode(6),
//         variant_attribute_ids: variantAttributeIds,
//       });
//       return;
//     }

//     const key = orderedAttributeIds[index];
//     const values = variantAttributesName[key];

//     if (values && values.length > 0) {
//       for (const value of values) {
//         current.push(value);
//         combine(index + 1, current);
//         current.pop();
//       }
//     } else {
//       combine(index + 1, current);
//     }
//   };

//   combine(0, []);
//   return combinations;
// };

export const generateCombinationsFromVariantAttributes = (
  dataSource,
  variantAttributesName,
  buying_price,
  selling_price
) => {
  if (
    !dataSource.length ||
    Object.keys(variantAttributesName).length === 0 ||
    Object.values(variantAttributesName).every((values) => values.length === 0)
  ) {
    return [];
  }

  const orderedAttributeIds = dataSource.map((item) => item.id);
  const options = dataSource.flatMap((item) => item.options);

  const filterOptions = (options, filter) =>
    options.filter((option) =>
      filter[option.attribute_id]?.includes(option.name)
    );

  const orderedAttributesOptions = filterOptions(
    options,
    variantAttributesName
  );

  const combinations = [];

  const combine = (index, current) => {
    if (index === orderedAttributeIds.length) {
      const combinationName = current.join(' ');
      const variantAttributeIds = current.map(
        (name) =>
          orderedAttributesOptions.find((option) => option.name === name)?.id
      );
      const key = variantAttributeIds
        .map((id, index) => `${orderedAttributeIds[index]}${id}`)
        .join('-');
      combinations.push({
        key,
        name: combinationName,
        sku: generateRandomCode(6),
        cost: buying_price,
        price: selling_price,
        variant_attribute_ids: variantAttributeIds,
      });
      return;
    }

    const key = orderedAttributeIds[index];
    const values = variantAttributesName[key];

    if (values && values.length > 0) {
      for (const value of values) {
        current.push(value);
        combine(index + 1, current);
        current.pop();
      }
    } else {
      combine(index + 1, current);
    }
  };

  combine(0, []);
  return combinations;
};
