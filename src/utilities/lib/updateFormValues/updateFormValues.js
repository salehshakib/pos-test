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
    formProductTaxRate?.[id] ?? taxes?.rate ?? 0
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
