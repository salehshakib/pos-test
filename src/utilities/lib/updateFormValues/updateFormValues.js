export function setFormValuesId(
  id,
  sale_unit_id,
  unit_cost,
  sale_units,
  formValues,
  productUnits,
  tax_id
) {
  formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

  formValues.product_list.net_unit_price[id] =
    formValues.product_list.net_unit_price[id] ?? unit_cost;

  formValues.product_list.discount[id] =
    formValues.product_list.discount[id] ?? 0;

  formValues.product_list.tax[id] = parseFloat(
    (
      (parseInt(productUnits.sale_units[id]) *
        parseInt(formValues.product_list.tax_rate[id]) *
        parseInt(formValues.product_list.net_unit_price[id]) *
        parseInt(formValues.product_list.qty[id])) /
      100
    ).toFixed(2)
  );

  formValues.product_list.tax_rate[id] =
    formValues.product_list.tax_rate[id] ?? 0;

  productUnits.sale_units[id] =
    productUnits?.sale_units[id] ?? sale_units?.operation_value ?? 1;

  formValues.product_list.total[id] =
    productUnits.sale_units[id] *
      parseInt(unit_cost) *
      formValues.product_list.qty[id] -
    formValues.product_list.discount[id] +
    formValues.product_list.tax[id];

  formValues.product_list.sale_unit_id[id] =
    formValues.product_list.sale_unit_id[id] ?? sale_unit_id;

  formValues.product_list.tax_id[id] =
    formValues.product_list.tax_id[id] ?? tax_id;
}
