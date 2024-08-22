export const showCurrency = (value, currency) => {
  if (value === null || value === 'null' || value === undefined) return '0.00';

  const formattedValue = parseFloat(value).toFixed(2);
  const isPrefix = currency.position.toString() === '0';

  return isPrefix
    ? `${currency.name} ${formattedValue}`
    : `${formattedValue} ${currency.name}`;
};
