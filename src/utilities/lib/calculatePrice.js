export function calculateOriginalPrice(totalPrice, taxRate, taxMethod) {
  // Convert tax rate to decimal
  const taxRateDecimal = taxRate / 100;

  // Calculate original price
  const originalPrice = totalPrice / (1 + taxRateDecimal);

  // Round to two decimal places and always show two decimal places
  if (taxMethod === "Inclusive") {
    return originalPrice.toFixed(2);
  }

  return (Math.round(originalPrice * 100) / 100).toFixed(2);
}
