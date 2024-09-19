export function errorFieldsUpdate(fields, error) {
  return Object.keys(error?.data?.errors)?.map((fieldName) => {
    if (fieldName === 'product_list') {
      return {
        name: 'product_name',
        value: fields.find((field) => field?.name === 'product_name').value,
        errors: error?.data?.errors[fieldName],
      };
    } else
      return {
        name: fieldName,
        value: fields.find((field) => field?.name === fieldName)?.value,
        errors: error?.data?.errors[fieldName],
      };
  });
}
