export const showCurrency = (value, currency) => {
  const isPrefix = currency.position.toString() === '0';

  if (value === null || value === 'null' || value === undefined)
    return isPrefix ? `${currency.name} 0.00` : `0.00${currency.name}`;
  const formattedValue = parseFloat(value).toFixed(2);

  return isPrefix
    ? `${currency.name} ${formattedValue}`
    : `${formattedValue} ${currency.name}`;
};
