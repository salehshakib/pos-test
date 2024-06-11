export const calculateTotalPrice = (data) => {
  const totals = Object.values(data.total).map(
    (value) => parseFloat(value) || 0
  );
  const totalPrice = totals.reduce((sum, value) => sum + value, 0);

  return totalPrice;
};

export const calculateTotalTax = (totalPrice, taxRate = 0) => {
  const totalTax = (totalPrice * taxRate) / 100;
  return totalTax ? Number(totalTax).toFixed(2) : "0.00";
};

export const calculateGrandTotal = (
  totalPrice,
  totalTax,
  discount,
  shipping_cost
) => {
  // Ensure all inputs are parsed as numbers
  const parsedTotalPrice = parseFloat(totalPrice) || 0;
  const parsedTotalTax = parseFloat(totalTax) || 0;
  const parsedDiscount = parseFloat(discount) || 0;
  const parsedShippingCost = parseFloat(shipping_cost) || 0;

  // Calculate the grand total
  let grandTotal = parsedTotalPrice + parsedTotalTax;

  // Apply discount if provided
  if (parsedDiscount) {
    grandTotal -= parsedDiscount;
  }

  // Add shipping cost if provided
  if (parsedShippingCost) {
    grandTotal += parsedShippingCost;
  }

  // Return the formatted grand total
  return grandTotal ? Number(grandTotal).toFixed(2) : "0.00";
};

export const transformQuotationProducts = (quotationProducts) => {
  const productList = {
    qty: {},
    sale_unit_id: {},
    net_unit_price: {},
    discount: {},
    tax_rate: {},
    tax: {},
    total: {},
  };

  quotationProducts?.forEach(({ product_id, ...product }) => {
    productList.qty[product_id] = product.qty;
    productList.sale_unit_id[product_id] = product.sale_unit_id;
    productList.net_unit_price[product_id] = product.net_unit_price;
    productList.discount[product_id] = parseInt(product.discount);
    productList.tax_rate[product_id] = parseInt(product.tax_rate);
    productList.tax[product_id] = parseInt(product.tax);
    productList.total[product_id] = parseInt(product.total);
  });

  return productList;
};
