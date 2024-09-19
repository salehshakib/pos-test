import { Col, Form } from 'antd';
import { useEffect } from 'react';

import { fullColLayout } from '../../../layout/FormLayout';
import { calculateSummary } from '../../../utilities/lib/generator/generatorUtils';
import { TotalRow } from '../../ReusableComponent/TotalRow';

export const PurchaseSummary = ({ formValues }) => {
  const form = Form.useFormInstance();

  const paymentStatus = Form.useWatch('payment_status', form);

  const discount = Form.useWatch('discount', form);
  const shipping_cost = Form.useWatch('shipping_cost', form);
  const tax_rate = Form.useWatch('tax_rate', form);
  const paid_amount = Form.useWatch('paid_amount', form);

  const { totalItems, totalQty, totalPrice, taxRate, grandTotal } =
    calculateSummary(formValues, tax_rate ?? 0, discount, shipping_cost);

  useEffect(() => {
    if (paymentStatus === 'Paid') {
      form.setFieldValue('paid_amount', grandTotal);
    } else if (
      paymentStatus === 'Partial' &&
      Number(paid_amount) > totalPrice
    ) {
      form.setFieldValue('paid_amount', totalPrice);
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
