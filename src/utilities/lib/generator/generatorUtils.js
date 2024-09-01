import { decimalConverter } from '../return/decimalComverter';

export const calculateSummary = (
  formValues,
  tax_rate = 0,
  discount = 0,
  shipping_cost = 0
) => {
  const productList = formValues.product_list || {};

  const totalItems = Object.keys(productList?.qty || {}).length;

  const totalQty = Object.values(productList?.qty || {}).reduce(
    (acc, cur) => acc + (parseFloat(cur) || 0),
    0
  );

  const totalPrice = calculateTotalPrice(productList);

  const taxRate = calculateTotalTax(totalPrice, tax_rate, discount);

  const grandTotal = calculateGrandTotal(
    totalPrice,
    tax_rate,
    discount,
    shipping_cost
  );

  return { totalItems, totalQty, totalPrice, taxRate, grandTotal };
};

export const calculateTotalPrice = (data) => {
  const totals = Object.values(data?.total).map(
    (value) => parseFloat(value) || 0
  );
  const totalPrice = totals.reduce((sum, value) => sum + value, 0);

  return totalPrice;
};

export const calculateTotalTax = (totalPrice, taxRate = 0, discount = 0) => {
  const price = decimalConverter(totalPrice);
  const discountValue = decimalConverter(discount);

  const totalTax = ((price - discountValue) * taxRate) / 100;
  return totalTax ? Number(totalTax).toFixed(2) : '0.00';
};

export const calculateGrandTotal = (
  totalPrice,
  taxRate,
  discount,
  shipping_cost
  // orderTaxRate
) => {
  const parsedTotalPrice = parseFloat(totalPrice) || 0;

  const parsedTax =
    parseFloat(calculateTotalTax(totalPrice, taxRate, discount)) || 0;

  const parsedDiscount = parseFloat(discount) || 0;

  const parsedShippingCost = parseFloat(shipping_cost) || 0;

  let grandTotal = parsedTotalPrice + parsedTax;
  // + parsedOrderTaxRate;

  if (parsedDiscount) {
    grandTotal = grandTotal - parsedDiscount;
  }

  if (parsedShippingCost) {
    grandTotal = grandTotal + parsedShippingCost;
  }

  return grandTotal ? Number(grandTotal).toFixed(2) : '0.00';
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
