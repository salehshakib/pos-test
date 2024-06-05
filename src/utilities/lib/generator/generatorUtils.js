export const calculateTotalPrice = (data) => {
  const totals = Object.values(data.total);
  const totalPrice = totals.reduce((sum, value) => sum + value, 0);
  return totalPrice;
};

export const calculateTotalTax = (totalPrice, taxRate) => {
  const totalTax = (totalPrice * taxRate) / 100;
  return totalTax;
};

export const calculateGrandTotal = (
  totalPrice,
  totalTax,
  discount,
  shipping_cost
) => {
  const grandTotal = totalPrice + totalTax - discount + shipping_cost;
  return Number(grandTotal).toFixed(2);
};
