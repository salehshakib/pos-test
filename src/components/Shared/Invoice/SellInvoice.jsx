import { useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { useGetGeneralSettingsQuery } from '../../../redux/services/settings/generalSettings/generalSettingsApi';

const SellInvoice = ({ invoice }) => {
  const printRef = useRef(null);
  const { data } = useGetGeneralSettingsQuery();
  const reactToPrintRef = useRef(null);

  useEffect(() => {
    if (invoice && reactToPrintRef.current) {
      reactToPrintRef.current.handlePrint();
    }
  }, [invoice]);

  const {
    customers,
    cashiers,
    sale_products,
    reference_id,
    sale_at,
    grand_total,
    shipping_cost,
    total_tax,
    total_discount,
    payment_type,
    payment_status,
    warehouses,
  } = invoice || {};

  const customer_name = customers?.name || 'N/A';
  const customer_number = customers?.phone_number || 'N/A';
  const cashier_name = cashiers?.name || 'Cashier N/A';
  const warehouse_name = warehouses?.name ?? 'N/A';
  const paymentType = payment_type || 'N/A';
  const paymentStatus = payment_status || 'N/A';

  return (
    <>
      {invoice ? (
        <>
          <ReactToPrint
            ref={reactToPrintRef}
            trigger={() => <></>}
            content={() => printRef.current}
          />

          {data?.invoice_format === 'A4' ? (
            <div
              ref={printRef}
              className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-lg"
            >
              {/* Invoice Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Invoice</h1>
              </div>

              {/* Company, Warehouse Info, Customer Info */}
              <div className="flex justify-between mb-8">
                <div className="text-left">
                  <p className="font-bold">
                    {data?.company ?? 'Example Company'} ({warehouse_name})
                  </p>
                  <p>Address: {warehouses?.address ?? 'N/A'}</p>
                  <p>Phone: {warehouses?.phone ?? 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p>Invoice #{reference_id}</p>
                  <p>Name: {customer_name}</p>
                  <p>Mobile: {customer_number}</p>
                  <p>Cashier: {cashier_name}</p>
                  <p>Date: {sale_at}</p>
                </div>
              </div>

              <table className="w-full table-auto mb-8 border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">Product</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Discount</th>
                    <th className="px-4 py-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sale_products.map((product, index) => {
                    const variant = product.product_variants || {};
                    return (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">
                          {variant.name || 'N/A'}
                        </td>
                        <td className="px-4 py-2 border">
                          ${product.net_unit_price}
                        </td>
                        <td className="px-4 py-2 border">{product.qty}</td>
                        <td className="px-4 py-2 border">
                          ${product.discount}
                        </td>
                        <td className="px-4 py-2 border">${product.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end">
                <table className="table-auto text-right">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Before Tax:</td>
                      <td className="px-4 py-2">
                        $
                        {sale_products.reduce(
                          (acc, item) => acc + item.total,
                          0
                        ) - total_tax}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Tax Amount:</td>
                      <td className="px-4 py-2">${total_tax || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Shipping Cost:</td>
                      <td className="px-4 py-2">${shipping_cost || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Total Discount:</td>
                      <td className="px-4 py-2">${total_discount || 0}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Grand Total:</td>
                      <td className="px-4 py-2 font-bold">${grand_total}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Payment Type:</td>
                      <td className="px-4 py-2">{paymentType}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Payment Status:</td>
                      <td className="px-4 py-2">{paymentStatus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-8">
                <p className="font-bold">
                  Invoice generated by {data?.company ?? 'Example Company'}
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={printRef}
              className="max-w-xs mx-auto p-4 border border-gray-300 rounded-lg text-sm"
              style={{ width: '80mm' }}
            >
              <div className="text-center mb-4">
                <h1 className="text-lg font-bold">Invoice</h1>
              </div>

              <div className="mb-4">
                <div className="text-left">
                  <p className="font-bold">
                    {data?.company ?? 'Example Company'} ({warehouse_name})
                  </p>
                  <p>Address: {warehouses?.address ?? 'N/A'}</p>
                  <p>Phone: {warehouses?.phone ?? 'N/A'}</p>
                </div>
                <div className="mt-2">
                  <p>Invoice #{reference_id}</p>
                  <p>Name: {customer_name}</p>
                  <p>Mobile: {customer_number}</p>
                  <p>Cashier: {cashier_name}</p>
                  <p>Date: {sale_at}</p>
                </div>
              </div>

              <table className="w-full table-auto mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-1">#</th>
                    <th className="px-2 py-1">Product</th>
                    <th className="px-2 py-1">Qty</th>
                    <th className="px-2 py-1">Price</th>
                    <th className="px-2 py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sale_products.map((product, index) => {
                    const variant = product.product_variants || {};
                    return (
                      <tr key={index} className="text-center text-sm">
                        <td className="px-2 py-1">{index + 1}</td>
                        <td className="px-2 py-1">{variant.name || 'N/A'}</td>
                        <td className="px-2 py-1">{product.qty}</td>
                        <td className="px-2 py-1">${product.net_unit_price}</td>
                        <td className="px-2 py-1">${product.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="text-right">
                <p>
                  Before Tax: $
                  {sale_products.reduce((acc, item) => acc + item.total, 0) -
                    total_tax}
                </p>
                <p>Tax: ${total_tax || 0}</p>
                <p>Shipping: ${shipping_cost || 0}</p>
                <p>Discount: ${total_discount || 0}</p>
                <p className="font-bold">Grand Total: ${grand_total}</p>
                <p>Payment: {paymentType}</p>
                <p>Status: {paymentStatus}</p>
              </div>

              <div className="text-center mt-4">
                <p>Generated by {data?.company ?? 'Example Company'}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SellInvoice;
