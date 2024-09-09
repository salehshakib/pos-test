export function calculateById(unitsArray, id, amount) {
  const unit = unitsArray.find((unit) => unit.id.toString() === id.toString());

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
