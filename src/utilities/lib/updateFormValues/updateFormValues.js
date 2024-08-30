export function setFormValuesId(
  id,
  sale_unit_id,
  unit_cost,
  sale_units,
  formValues,
  productUnits,
  tax_id,
  taxes,
  tax_method
) {
  const sanitizeIntValue = (value) => parseInt(value) || 0;
  const sanitizeFloatValue = (value) => parseFloat(value) || 0;

  if (!id) return;

  const formProductList = formValues.product_list;

  // Helper function to get and sanitize form values
  const getSanitizedValue = (field, defaultValue, sanitizer) =>
    sanitizer(formProductList[field]?.[id] ?? defaultValue);

  // Extract and sanitize values
  const qty = getSanitizedValue('qty', 1, sanitizeIntValue);
  const netUnitPrice = getSanitizedValue(
    'net_unit_price',
    unit_cost,
    sanitizeFloatValue
  );
  const discount = getSanitizedValue('discount', 0, sanitizeFloatValue);
  const taxRate = getSanitizedValue(
    'tax_rate',
    taxes?.rate ?? 0,
    sanitizeIntValue
  );

  // Calculating tax
  const tax = sanitizeFloatValue(
    ((qty * taxRate * (netUnitPrice - discount)) / 100).toFixed(2)
  );

  // Get or set sale units value
  const saleUnitsOperationValue = sale_units?.operation_value ?? 1;
  const productSaleUnitsValue =
    sanitizeIntValue(productUnits?.sale_units?.[id]) || saleUnitsOperationValue;

  productUnits.sale_units[id] = productSaleUnitsValue;

  // const total =
  //   tax_method === 'Inclusive'
  //     ? Math.round(
  //         (productSaleUnitsValue * netUnitPrice * qty - discount + tax).toFixed(
  //           2
  //         )
  //       )
  //     : (productSaleUnitsValue * netUnitPrice * qty - discount + tax).toFixed(
  //         2
  //       );
  const total =
    tax_method === 'Inclusive'
      ? Math.round(
          (productSaleUnitsValue * netUnitPrice * qty - discount + tax).toFixed(
            2
          )
        )
      : (productSaleUnitsValue * netUnitPrice * qty + tax - discount).toFixed(
          2
        );

  // Set form values
  const setFormValue = (field, value) => {
    formProductList[field][id] = value;
  };

  setFormValue('qty', qty);
  setFormValue('net_unit_price', netUnitPrice);
  setFormValue('discount', discount);
  setFormValue('tax_rate', taxRate);
  setFormValue('tax', tax);
  setFormValue('total', total);
  setFormValue(
    'sale_unit_id',
    formProductList.sale_unit_id?.[id] ?? sale_unit_id
  );

  if (formProductList.tax_id) {
    setFormValue('tax_id', formProductList.tax_id?.[id] ?? tax_id);
  }
}

export function updateFormValues(
  id,
  unitCost,
  productUnitData,
  taxData,
  formValues
) {
  if (!id) return;

  const sanitizeValue = (value, sanitizer, defaultValue = 0) =>
    sanitizer(value ?? defaultValue);

  const formProductList = formValues.product_list;
  const formUnitList = formValues.units;

  const getSanitizedValue = (field, defaultValue, sanitizer) =>
    sanitizeValue(formProductList[field]?.[id], sanitizer, defaultValue);

  const setFormValue = (field, value) => {
    formProductList[field][id] = value;
  };

  const qty = getSanitizedValue('qty', 1, parseInt);
  let productUnitCost = unitCost;

  const calculateProductUnitCost = (field) => {
    if (formProductList[field]) {
      productUnitCost = getSanitizedValue(field, unitCost, parseFloat);
      setFormValue(field, productUnitCost);
    }
  };

  calculateProductUnitCost('net_unit_cost');
  calculateProductUnitCost('net_unit_price');

  const discount = getSanitizedValue('discount', 0, parseFloat);
  const taxRate = getSanitizedValue('tax_rate', taxData?.rate ?? 0, parseFloat);
  const productUnitOperator =
    formUnitList.operator[id] ?? productUnitData?.operator;
  const productUnitOperationValue = sanitizeValue(
    formUnitList.operation_value[id],
    parseFloat,
    parseFloat(productUnitData?.operation_value) || 1
  );

  const calculateTax = () => {
    const baseValue = (productUnitCost - discount) * qty;
    const taxAmount =
      productUnitOperator === '/'
        ? (taxRate * baseValue) / (100 * productUnitOperationValue)
        : (productUnitOperationValue * taxRate * baseValue) / 100;

    return sanitizeValue(taxAmount.toFixed(2), parseFloat);
  };

  const tax = calculateTax();

  const calculateTotal = (netUnitCost) => {
    const baseValue =
      productUnitOperator === '/'
        ? (netUnitCost * qty) / productUnitOperationValue
        : productUnitOperationValue * netUnitCost * qty;

    return taxData?.tax_method === 'Inclusive'
      ? Math.round((baseValue - discount + tax).toFixed(2))
      : Math.round((baseValue + tax - discount).toFixed(2));
  };

  const total = calculateTotal(productUnitCost);

  // Set form values
  setFormValue('qty', qty);

  if (formProductList.purchase_unit_id) {
    setFormValue(
      'purchase_unit_id',
      formProductList.purchase_unit_id[id] ?? productUnitData?.id
    );
  }

  if (formProductList.sale_unit_id) {
    setFormValue(
      'sale_unit_id',
      formProductList.sale_unit_id[id] ?? productUnitData?.id
    );
  }

  setFormValue('discount', discount);
  setFormValue('tax_rate', taxRate);
  setFormValue('tax', tax);
  setFormValue('total', total);

  if (formProductList?.recieved) {
    setFormValue('recieved', formProductList.recieved[id]);
  }

  setFormValue('tax_id', formProductList.tax_id?.[id] ?? taxData?.id);
}
