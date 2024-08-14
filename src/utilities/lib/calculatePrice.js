export function calculateOriginalPrice(totalPrice, taxRate, taxMethod) {
  // Ensure inputs are valid numbers
  const sanitizedTotalPrice = Number(totalPrice) || 0;
  const sanitizedTaxRate = Number(taxRate) || 0;

  // Convert tax rate to decimal
  const taxRateDecimal = sanitizedTaxRate / 100;

  if (taxMethod === "Inclusive") {
    // Calculate original price for inclusive tax
    let originalPrice = sanitizedTotalPrice / (1 + taxRateDecimal);
    // Ensure originalPrice is not negative
    originalPrice = Math.max(0, originalPrice);
    // Round to two decimal places and always show two decimal places
    return originalPrice.toFixed(2);
  } else {
    // For exclusive tax, return the main price (totalPrice)
    return sanitizedTotalPrice.toFixed(2);
  }
}
