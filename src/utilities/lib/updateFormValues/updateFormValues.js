// export function setFormValuesId(
//   id,
//   sale_unit_id,
//   unit_cost,
//   sale_units,
//   formValues,
//   productUnits,
//   tax_id,
//   // eslint-disable-next-line no-unused-vars
//   taxes
// ) {
//   if (id) {
//     formValues.product_list.qty[id] = formValues.product_list.qty[id] || 1;

//     formValues.product_list.net_unit_price[id] =
//       formValues.product_list.net_unit_price[id] ?? unit_cost ?? "0";

//     formValues.product_list.discount[id] =
//       formValues.product_list.discount[id] ?? 0;

//     formValues.product_list.tax[id] = parseFloat(
//       (
//         (parseInt(productUnits.sale_units?.[id] ?? 1) *
//           parseInt(formValues.product_list.tax_rate[id]) *
//           parseInt(formValues.product_list.net_unit_price[id]) *
//           parseInt(formValues.product_list.qty[id])) /
//         100
//       ).toFixed(2)
//     );

//     // console.log(sale_units);
//     // console.log(productUnits);

//     // console.log(formValues.product_list);

//     formValues.product_list.tax_rate[id] =
//       formValues.product_list.tax_rate[id] ?? 0;

//     const saleUnitsOperationValue = sale_units
//       ? sale_units?.operation_value !== null
//         ? sale_units?.operation_value
//         : 1
//       : 1;

//     productUnits.sale_units[id] =
//       productUnits?.sale_units[id] ?? saleUnitsOperationValue;

//     formValues.product_list.total[id] =
//       productUnits.sale_units[id] *
//         parseInt(formValues.product_list.net_unit_price[id] ?? 0) *
//         formValues.product_list.qty[id] -
//       formValues.product_list.discount[id] +
//       formValues.product_list.tax[id];

//     formValues.product_list.sale_unit_id[id] =
//       formValues.product_list.sale_unit_id[id] ?? sale_unit_id;

//     if (formValues?.product_list?.tax_id) {
//       formValues.product_list.tax_id[id] =
//         formValues.product_list?.tax_id?.[id] ?? tax_id;
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
  // eslint-disable-next-line no-unused-vars
  taxes
) {
  const sanitizeIntValue = (value) => {
    const number = parseInt(value);
    return isNaN(number) ? 0 : number;
  };

  const sanitizeFloatValue = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };

  console.log(taxes);

  if (id) {
    formValues.product_list.qty[id] = sanitizeIntValue(
      formValues.product_list.qty?.[id] || 1
    );

    formValues.product_list.net_unit_price[id] =
      sanitizeFloatValue(formValues.product_list.net_unit_price?.[id]) ||
      sanitizeFloatValue(unit_cost) ||
      "0";

    formValues.product_list.discount[id] = sanitizeFloatValue(
      formValues.product_list.discount?.[id] ?? 0
    );

    formValues.product_list.tax_rate[id] = sanitizeIntValue(
      taxes?.rate ?? formValues.product_list.tax_rate?.[id] ?? 0
    );

    formValues.product_list.tax[id] = sanitizeFloatValue(
      (
        (sanitizeIntValue(productUnits.sale_units?.[id] ?? 1) *
          sanitizeIntValue(formValues.product_list.tax_rate?.[id]) *
          sanitizeFloatValue(formValues.product_list.net_unit_price?.[id]) *
          sanitizeIntValue(formValues.product_list.qty?.[id])) /
        100
      ).toFixed(2)
    );

    const saleUnitsOperationValue = sale_units?.operation_value ?? 1;

    productUnits.sale_units[id] =
      sanitizeIntValue(productUnits?.sale_units?.[id]) ||
      saleUnitsOperationValue;

    formValues.product_list.total[id] =
      sanitizeIntValue(productUnits.sale_units?.[id]) *
        sanitizeFloatValue(formValues.product_list.net_unit_price?.[id] ?? 0) *
        sanitizeIntValue(formValues.product_list.qty?.[id]) -
      sanitizeFloatValue(formValues.product_list.discount?.[id]) +
      sanitizeFloatValue(formValues.product_list.tax?.[id]);

    formValues.product_list.sale_unit_id[id] =
      formValues.product_list.sale_unit_id?.[id] ?? sale_unit_id;

    if (formValues?.product_list?.tax_id) {
      formValues.product_list.tax_id[id] =
        formValues.product_list.tax_id?.[id] ?? tax_id;
    }
  }
}
