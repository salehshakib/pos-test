import { WAREHOUSE_HEAD_OFFICE } from '../../../assets/data/headoffice';
import { generateRandomCode } from '../generateCode';
import { getWarehouseQuantity } from '../getWarehouseQty';

export function formatProductData(data, productName, sku) {
  return data.map((item) => {
    const key = item.name.includes(productName)
      ? item.name.split(productName)[1]?.trim() || ''
      : '';
    const name = key || item.name;

    const skuValue = item.sku.split(sku + '-')[1]?.trim() || '';

    const variant_attribute_ids = item.product_variant_attribute_options.map(
      (option) => option.attribute_option.id
    );

    const qty = getWarehouseQuantity(item.product_qties, WAREHOUSE_HEAD_OFFICE);

    return {
      key,
      id: item.id,
      name,
      sku: skuValue,
      iemi: item.imei_number ?? '',
      qty: qty ?? 0,
      price: item.selling_price,
      cost: item.buying_price,
      variant_attribute_ids,
    };
  });
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

  return Object.values(attributesMap);
}

// export function formatVariantsData(variants, attributes) {
//   const attributesMap = {};

//   variants?.forEach((variant) => {
//     variant?.product_variant_attribute_options?.forEach((option) => {
//       const { attribute_id, attribute } = option.attribute_option;

//       // If the attribute is not in the attributesMap, add it
//       if (!attributesMap?.[attribute_id]) {
//         const matchingAttribute = attributes.find(
//           (item) => item.id.toString() === attribute_id.toString()
//         );

//         if (matchingAttribute) {
//           attributesMap[attribute_id] = {
//             key: attribute_id.toString(),
//             id: attribute_id.toString(),
//             name: matchingAttribute?.name, // Set the name of the attribute
//             options: matchingAttribute?.attribute_options.map((opt) => ({
//               ...opt,
//             })),
//           };
//         }
//       }
//     });
//   });

//   return Object.values(attributesMap);
// }

// export function formatVariantsData(variants, attributes, productName) {
//   const attributesMap = {};

//   variants?.forEach((variant) => {
//     variant?.product_variant_attribute_options?.forEach((option) => {
//       const { attribute_id, attribute } = option.attribute_option;

//       // If the attribute is not in the attributesMap, add it
//       if (!attributesMap?.[attribute_id]) {
//         const matchingAttribute = attributes.find(
//           (item) => item.id.toString() === attribute_id.toString()
//         );

//         if (matchingAttribute) {
//           attributesMap[attribute_id] = {
//             key: attribute_id.toString(),
//             id: attribute_id.toString(),
//             name: matchingAttribute?.name, // Set the name of the attribute
//             options: matchingAttribute?.attribute_options.map((opt) => ({
//               ...opt,
//             })),
//           };
//         }
//       }
//     });
//   });

//   // Custom sorting logic based on variant names
//   variants?.forEach((variant) => {
//     const variantName = variant.name.split(productName)[1];

//     // Example: "RED M" or "M RED"

//     // Determine the order based on the variant name
//     if (variantName.includes('RED') && variantName.includes('M')) {
//       if (variantName.startsWith('RED')) {
//         // Sort by color first, then size
//         attributesMap = sortAttributes(attributesMap, ['Color', 'Size']);
//       } else if (variantName.startsWith('M')) {
//         // Sort by size first, then color
//         attributesMap = sortAttributes(attributesMap, ['Size', 'Color']);
//       }
//     }
//   });

//   return Object.values(attributesMap);
// }

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
        iemi: '',
        qty: '0',
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

export function findNonMatchingItems(data, combination) {
  // Create a Set of data names for faster lookup
  const dataNames = new Set(data?.map((item) => item?.name));

  // Filter the combination array to find non-matching items
  return combination.filter(
    (combinationItem) => !dataNames.has(combinationItem.name)
  );
}

export const getIdsNotInSelectedRowData = (selectedRowData, data) => {
  const selectedIds = new Set(selectedRowData.map((item) => item.id));
  return data
    .filter((item) => !selectedIds.has(item.id))
    .map((item) => item.id);
};
