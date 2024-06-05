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
