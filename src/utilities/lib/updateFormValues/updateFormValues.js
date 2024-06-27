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

//   if (!id) return;

//   const formProductList = formValues.product_list;
//   const formProductQty = formProductList.qty;
//   const formProductNetUnitPrice = formProductList.net_unit_price;
//   const formProductDiscount = formProductList.discount;
//   const formProductTaxRate = formProductList.tax_rate;
//   const formProductTax = formProductList.tax;
//   const formProductTotal = formProductList.total;
//   const formProductSaleUnitId = formProductList.sale_unit_id;
//   const formProductTaxId = formProductList.tax_id;

//   const productSaleUnits = productUnits.sale_units;

//   formProductQty[id] = sanitizeIntValue(formProductQty?.[id] || 1);

//   formProductNetUnitPrice[id] =
//     sanitizeFloatValue(formProductNetUnitPrice?.[id]) ||
//     sanitizeFloatValue(unit_cost);

//   formProductDiscount[id] = sanitizeFloatValue(formProductDiscount?.[id]);

//   formProductTaxRate[id] = sanitizeIntValue(
//     formProductTaxRate?.[id] ?? taxes?.rate ?? 0
//   );

//   const qty = sanitizeIntValue(formProductQty[id]);
//   const netUnitPrice = sanitizeFloatValue(formProductNetUnitPrice[id]);
//   const taxRate = sanitizeIntValue(formProductTaxRate[id]);
//   const discount = sanitizeFloatValue(formProductDiscount[id]);

//   const saleUnitsOperationValue = sale_units?.operation_value ?? 1;
//   productSaleUnits[id] =
//     sanitizeIntValue(productSaleUnits?.[id]) || saleUnitsOperationValue;

//   const tax = ((qty * taxRate * netUnitPrice) / 100).toFixed(2);
//   formProductTax[id] = sanitizeFloatValue(tax);

//   formProductTotal[id] = (
//     productSaleUnits[id] * netUnitPrice * qty -
//     discount +
//     sanitizeFloatValue(formProductTax[id])
//   ).toFixed(2);

//   formProductSaleUnitId[id] = formProductSaleUnitId?.[id] ?? sale_unit_id;

//   if (formProductTaxId) {
//     formProductTaxId[id] = formProductTaxId?.[id] ?? tax_id;
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
  const sanitizeFloatValue = (value) => parseFloat(value) || 0;

  if (!id) return;

  const formProductList = formValues.product_list;

  // Helper function to get and sanitize form values
  const getSanitizedValue = (field, defaultValue, sanitizer) =>
    sanitizer(formProductList[field]?.[id] ?? defaultValue);

  // Extract and sanitize values
  const qty = getSanitizedValue("qty", 1, sanitizeIntValue);
  const netUnitPrice = getSanitizedValue(
    "net_unit_price",
    unit_cost,
    sanitizeFloatValue
  );
  const discount = getSanitizedValue("discount", 0, sanitizeFloatValue);
  const taxRate = getSanitizedValue(
    "tax_rate",
    taxes?.rate ?? 0,
    sanitizeIntValue
  );

  // Calculating tax
  const tax = sanitizeFloatValue(
    ((qty * taxRate * netUnitPrice) / 100).toFixed(2)
  );

  // Get or set sale units value
  const saleUnitsOperationValue = sale_units?.operation_value ?? 1;
  const productSaleUnitsValue =
    sanitizeIntValue(productUnits.sale_units?.[id]) || saleUnitsOperationValue;
  productUnits.sale_units[id] = productSaleUnitsValue;

  // Calculating total
  const total = (
    productSaleUnitsValue * netUnitPrice * qty -
    discount +
    tax
  ).toFixed(2);

  // Set form values
  const setFormValue = (field, value) => {
    formProductList[field][id] = value;
  };

  setFormValue("qty", qty);
  setFormValue("net_unit_price", netUnitPrice);
  setFormValue("discount", discount);
  setFormValue("tax_rate", taxRate);
  setFormValue("tax", tax);
  setFormValue("total", total);
  setFormValue(
    "sale_unit_id",
    formProductList.sale_unit_id?.[id] ?? sale_unit_id
  );

  if (formProductList.tax_id) {
    setFormValue("tax_id", formProductList.tax_id?.[id] ?? tax_id);
  }
}
