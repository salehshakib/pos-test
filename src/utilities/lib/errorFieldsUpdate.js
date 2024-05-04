export function errorFieldsUpdate(fields, error) {
  return Object.keys(error?.data?.errors)?.map((fieldName) => ({
    name: fieldName,
    value: fields.find((field) => field.name === fieldName).value,
    errors: error?.data?.errors[fieldName],
  }));
}
