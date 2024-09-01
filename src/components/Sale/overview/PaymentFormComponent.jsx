import { Col, Form } from 'antd';
import { useEffect } from 'react';

import {
  colLayout,
  fullColLayout,
  mdColLayout,
} from '../../../layout/FormLayout';
import { useGetAllGiftCardQuery } from '../../../redux/services/giftcard/giftcard/giftCardApi';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';

const PaymentType = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('payment_type', 'Cash');
  }, [form]);

  const options = [
    {
      value: 'Cash',
      label: 'Cash',
    },
    {
      value: 'Gift Card',
      label: 'Gift Card',
    },
    {
      value: 'Card',
      label: 'Card',
    },
    {
      value: 'Cheque',
      label: 'Cheque',
    },
    // {
    //   value: "Points",
    //   label: "Points",
    // },
  ];

  return (
    <CustomSelect
      label="Payment Type"
      options={options}
      name={'payment_type'}
    />
  );
};

const GiftCardComponent = () => {
  const { data, isFetching } = useGetAllGiftCardQuery({});

  const options = data?.results?.giftcard?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.card_no,
    };
  });

  return (
    <Col {...fullColLayout}>
      <CustomSelect
        isLoading={isFetching}
        options={options}
        name="gift_card_id"
        label="Gift Card Number"
        required={true}
      />
    </Col>
  );
};

const CardComponent = () => {
  const options = [
    {
      //master credit
      value: 'Master Card (Credit)',
      label: 'Master Card (Credit)',
    },
    {
      //visa credit
      value: 'Visa Card (Credit)',
      label: 'Visa Card (Credit)',
    },
    {
      //master debit
      value: 'Master Card (Debit)',
      label: 'Master Card (Debit)',
    },
    {
      //visa debit
      value: 'Visa Card (Debit)',
      label: 'Visa Card (Debit)',
    },
    {
      //american express
      value: 'American Express',
      label: 'American Express',
    },
  ];

  return (
    <>
      <Col {...mdColLayout}>
        <CustomInput
          type={'text'}
          name="issuer"
          label="Issuer Name"
          required={true}
        />
      </Col>
      <Col {...mdColLayout}>
        <CustomSelect
          options={options}
          name="card_type"
          label="Card Type"
          required={true}
        />
      </Col>
    </>
  );
};

const ChequeComponent = () => {
  return (
    <>
      <Col {...mdColLayout}>
        <CustomInput
          type={'text'}
          name="bank"
          label="Bank Name"
          required={true}
        />
      </Col>
      <Col {...mdColLayout}>
        <CustomInput
          type={'text'}
          name="cheque_no"
          label="Cheque Number"
          required={true}
        />
      </Col>
    </>
  );
};

export const PaymentTypeComponent = () => {
  const form = Form.useFormInstance();
  const paymentStatus = Form.useWatch('payment_status', form);

  const receivedAmount = Form.useWatch('recieved_amount', form);
  const paidAmount = Form.useWatch('paid_amount', form);

  const paymentType = Form.useWatch('payment_type', form);

  // const taxRate = Form.useWatch('tax_rate', form);
  // const discount = Form.useWatch('discount', form);
  // const shippingCost = Form.useWatch('shipping_cost', form);

  // const calculatedGrandTotal = calculateGrandTotal(
  //   calculatedTotalPrice,
  //   tax_rate ?? 0,
  //   discount,
  //   shipping_cost
  // );

  // useEffect(() => {
  //   if (paymentStatus === 'Paid') {
  //     const tax_rate =form.getFieldValue('tax_rate') ?? 0

  //     form.setFieldValue('paid_amount', grandTotal);
  //   }
  // }, [paidAmount, form, paymentStatus,  receivedAmount]);

  const change = Number(
    parseFloat(receivedAmount ?? 0) - parseFloat(paidAmount ?? 0)
  ).toFixed(2);

  return (
    (paymentStatus === 'Paid' || paymentStatus === 'Partial') && (
      <>
        <Col {...colLayout}>
          <PaymentType />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            type={'number'}
            name="recieved_amount"
            label="Recieved Amount"
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            type={'number'}
            name="paid_amount"
            label="Paid Amount"
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            type={'text'}
            name="payment_receiver"
            label="Payment Receiver"
          />
        </Col>

        {paymentStatus === 'Paid' && (
          <Col {...fullColLayout}>
            <div className="py-9 text-lg font-semibold">Change: {change}</div>
          </Col>
        )}

        {paymentStatus === 'Partial' && (
          <Col {...fullColLayout}>
            <div className="py-9 text-lg font-semibold">
              Due: {Number(paidAmount - receivedAmount || 0).toFixed(2)}
            </div>
          </Col>
        )}

        {paymentType === 'Gift Card' && <GiftCardComponent />}
        {paymentType === 'Card' && <CardComponent />}
        {paymentType === 'Cheque' && <ChequeComponent />}
      </>
    )
  );
};
