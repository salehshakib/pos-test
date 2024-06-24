// export function setFormValuesId(
//   id,
//   sale_unit_id,
//   unit_cost,
//   sale_units,
//   formValues,
//   productUnits,
//   tax_id,
//   taxes
// ) {
//   const sanitizeIntValue = (value) => {
//     const number = parseInt(value);
//     return isNaN(number) ? 0 : number;
//   };

//   const sanitizeFloatValue = (value) => {
//     const number = parseFloat(value);
//     return isNaN(number) ? 0 : number;
//   };

//   if (id) {
//     formValues.product_list.qty[id] = sanitizeIntValue(
//       formValues.product_list.qty?.[id] || 1
//     );

//     formValues.product_list.net_unit_price[id] =
//       sanitizeFloatValue(formValues.product_list.net_unit_price?.[id]) ||
//       sanitizeFloatValue(unit_cost) ||
//       "0";

//     formValues.product_list.discount[id] = sanitizeFloatValue(
//       formValues.product_list.discount?.[id] ?? 0
//     );

//     formValues.product_list.tax_rate[id] = sanitizeIntValue(
//       taxes?.rate ?? formValues.product_list.tax_rate?.[id] ?? 0
//     );

//     formValues.product_list.tax[id] = sanitizeFloatValue(
//       (
//         (sanitizeIntValue(productUnits.sale_units?.[id] ?? 1) *
//           sanitizeIntValue(formValues.product_list.tax_rate?.[id]) *
//           sanitizeFloatValue(formValues.product_list.net_unit_price?.[id]) *
//           sanitizeIntValue(formValues.product_list.qty?.[id])) /
//         100
//       ).toFixed(2)
//     );

//     const saleUnitsOperationValue = sale_units?.operation_value ?? 1;

//     productUnits.sale_units[id] =
//       sanitizeIntValue(productUnits?.sale_units?.[id]) ||
//       saleUnitsOperationValue;

//     formValues.product_list.total[id] =
//       sanitizeIntValue(productUnits.sale_units?.[id]) *
//         sanitizeFloatValue(formValues.product_list.net_unit_price?.[id] ?? 0) *
//         sanitizeIntValue(formValues.product_list.qty?.[id]) -
//       sanitizeFloatValue(formValues.product_list.discount?.[id]) +
//       sanitizeFloatValue(formValues.product_list.tax?.[id]);

//     formValues.product_list.sale_unit_id[id] =
//       formValues.product_list.sale_unit_id?.[id] ?? sale_unit_id;

//     if (formValues?.product_list?.tax_id) {
//       formValues.product_list.tax_id[id] =
//         formValues.product_list.tax_id?.[id] ?? tax_id;
//     }
//   }
// }

export function setFormValuesId(
  id,
  sale_unit_id,
  unit_cost,
  sale_units,
  formValues,
  productUnits,
  tax_id,
  taxes
) {
  const sanitizeIntValue = (value) => parseInt(value) || 0;
  const sanitizeFloatValue = (value) => parseFloat(value) || 0.0;

  if (!id) return;

  const formProductList = formValues.product_list;
  const formProductQty = formProductList.qty;
  const formProductNetUnitPrice = formProductList.net_unit_price;
  const formProductDiscount = formProductList.discount;
  const formProductTaxRate = formProductList.tax_rate;
  const formProductTax = formProductList.tax;
  const formProductTotal = formProductList.total;
  const formProductSaleUnitId = formProductList.sale_unit_id;
  const formProductTaxId = formProductList.tax_id;

  const productSaleUnits = productUnits.sale_units;

  formProductQty[id] = sanitizeIntValue(formProductQty?.[id] || 1);

  formProductNetUnitPrice[id] =
    sanitizeFloatValue(formProductNetUnitPrice?.[id]) ||
    sanitizeFloatValue(unit_cost);

  formProductDiscount[id] = sanitizeFloatValue(formProductDiscount?.[id]);

  formProductTaxRate[id] = sanitizeIntValue(
    taxes?.rate ?? formProductTaxRate?.[id]
  );

  const qty = sanitizeIntValue(formProductQty[id]);
  const netUnitPrice = sanitizeFloatValue(formProductNetUnitPrice[id]);
  const taxRate = sanitizeIntValue(formProductTaxRate[id]);
  const discount = sanitizeFloatValue(formProductDiscount[id]);

  const saleUnitsOperationValue = sale_units?.operation_value ?? 1;
  productSaleUnits[id] =
    sanitizeIntValue(productSaleUnits?.[id]) || saleUnitsOperationValue;

  const tax = ((qty * taxRate * netUnitPrice) / 100).toFixed(2);
  formProductTax[id] = sanitizeFloatValue(tax);

  formProductTotal[id] = (
    productSaleUnits[id] * netUnitPrice * qty -
    discount +
    sanitizeFloatValue(formProductTax[id])
  ).toFixed(2);

  formProductSaleUnitId[id] = formProductSaleUnitId?.[id] ?? sale_unit_id;

  if (formProductTaxId) {
    formProductTaxId[id] = formProductTaxId?.[id] ?? tax_id;
  }
}
