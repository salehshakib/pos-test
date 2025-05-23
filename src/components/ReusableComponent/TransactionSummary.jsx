import { Col, Form } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { fullColLayout } from '../../layout/FormLayout';
import { calculateSummary } from '../../utilities/lib/generator/generatorUtils';
import { TotalRow } from './TotalRow';

export const TransactionSummary = ({ formValues }) => {
  const form = Form.useFormInstance();

  const paymentStatus = Form.useWatch('payment_status', form);

  const discount = Form.useWatch('discount', form);
  const discountType = Form.useWatch('discount_type', form);
  const shipping_cost = Form.useWatch('shipping_cost', form);
  const tax_rate = Form.useWatch('tax_rate', form);
  const paid_amount = Form.useWatch('paid_amount', form);
  const giftCard = Form.useWatch('gift_card_id', form);

  const { totalItems, totalQty, totalPrice, taxRate, grandTotal } =
    calculateSummary(
      formValues,
      tax_rate ?? 0,
      discount,
      shipping_cost,
      discountType,
      giftCard
    );

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

  let percentDiscount = 0;

  if (discountType === 'Percentage') {
    percentDiscount = parseFloat((discount * totalPrice) / 100).toFixed(2);
  }

  const { pathname } = useLocation();

  return (
    <Col {...fullColLayout}>
      <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        taxRate={
          !pathname.includes('inventory/transfer') ? (taxRate ?? 0) : undefined
        }
        discount={
          !pathname.includes('inventory/transfer') &&
          !['/return/purchase-return', '/return/sale-return'].includes(pathname) // Check for return or purchase-return
            ? discountType === 'Percentage'
              ? percentDiscount
              : (discount ?? 0)
            : undefined
        }
        shippingCost={
          !['/return/purchase-return', '/return/sale-return'].includes(pathname) // Check for return or purchase-return
            ? (shipping_cost ?? 0)
            : undefined
        }
        grandTotal={grandTotal}
      />
    </Col>
  );
};
