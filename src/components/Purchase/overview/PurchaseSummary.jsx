import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';

import { fullColLayout } from '../../../layout/FormLayout';
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from '../../../utilities/lib/generator/generatorUtils';
import { TotalRow } from '../../ReusableComponent/TotalRow';

export const PurchaseSummary = ({ formValues }) => {
  const form = Form.useFormInstance();

  const paymentStatus = Form.useWatch('payment_status', form);

  const discount = Form.useWatch('discount', form);
  const shipping_cost = Form.useWatch('shipping_cost', form);
  const tax_rate = Form.useWatch('tax_rate', form);
  const paid_amount = Form.useWatch('paid_amount', form);

  const [totalItems, setTotalItems] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const calculatedTotalItems =
      Object.keys(formValues.product_list?.qty).length ?? 0;

    const calculatedTotalQty = Object.values(
      formValues.product_list?.qty
    ).reduce((acc, cur) => acc + (parseFloat(cur) || 0), 0);

    const calculatedTotalPrice = calculateTotalPrice(formValues.product_list);

    const orderTax = calculateTotalTax(
      calculatedTotalPrice,
      tax_rate ?? 0,
      discount
    );

    const calculatedGrandTotal = calculateGrandTotal(
      calculatedTotalPrice,
      tax_rate ?? 0,
      discount,
      shipping_cost
    );

    setTotalItems(calculatedTotalItems);
    setTotalQty(calculatedTotalQty);
    setTotalPrice(calculatedTotalPrice);
    setGrandTotal(calculatedGrandTotal);
    setTaxRate(orderTax);
  }, [discount, formValues, shipping_cost, tax_rate]);

  useEffect(() => {
    if (paymentStatus === 'Paid') {
      form.setFieldValue('paid_amount', grandTotal);
    }

    if (paymentStatus === 'Partial') {
      if (Number(paid_amount) > totalPrice) {
        form.setFieldValue('paid_amount', totalPrice);
      }
    }
  }, [paymentStatus, form, totalPrice, paid_amount, grandTotal]);

  return (
    <Col {...fullColLayout}>
      <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        taxRate={taxRate ?? 0}
        discount={discount ?? 0}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      />
    </Col>
  );
};
