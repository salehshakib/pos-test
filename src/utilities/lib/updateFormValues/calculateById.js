export function calculateById(unitsArray, id, amount) {
  const unit =
    unitsArray &&
    unitsArray.find((unit) => unit?.id?.toString() === id?.toString());

  if (unit) {
    const operationValue = parseFloat(unit.operation_value);
    let result;

    switch (unit.operator) {
      case '*':
        result = amount / operationValue;
        break;
      case '/':
        result = amount * operationValue;
        break;
      default:
        return parseFloat(amount);
    }

    return parseFloat(result);
  }

  return parseFloat(amount);
}

export function calculateUnitCost(unit, amount, formValuesUnits, id) {
  const operationValue = formValuesUnits?.operation_value?.[id]
    ? parseFloat(formValuesUnits?.operation_value?.[id])
    : parseFloat(unit?.operation_value ?? 1);

  const operator = formValuesUnits?.operator?.[id]
    ? formValuesUnits?.operator?.[id]
    : (unit?.operator ?? '*');
  let result;

  switch (operator) {
    case '/':
      result = amount / operationValue;
      break;
    case '*':
      result = amount * operationValue;
      break;
    default:
      return parseFloat(amount);
  }

  return parseFloat(result);
}
