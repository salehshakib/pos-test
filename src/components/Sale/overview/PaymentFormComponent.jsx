import { Col, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  colLayout,
  fullColLayout,
  mdColLayout,
} from '../../../layout/FormLayout';
import { useGetAllGiftCardQuery } from '../../../redux/services/giftcard/giftcard/giftCardApi';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetPosSettingsQuery } from '../../../redux/services/settings/generalSettings/generalSettingsApi';
import { useGlobalParams } from '../../../utilities/hooks/useParams';
import { showCurrency } from '../../../utilities/lib/currency';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';

const PaymentType = () => {
  const form = Form.useFormInstance();

  const params = {
    child: 1,
  };
  const { data } = useGetPosSettingsQuery(params);

  const options = useMemo(() => {
    return [
      data?.cash_payment
        ? {
            value: 'Cash',
            label: 'Cash',
          }
        : null,
      data?.card_payment
        ? {
            value: 'Card',
            label: 'Card',
          }
        : null,
      data?.cheque_payment
        ? {
            value: 'Cheque',
            label: 'Cheque',
          }
        : null,
      data?.gift_card_payment
        ? {
            value: 'Gift Card',
            label: 'Gift Card',
          }
        : null,
    ].filter(Boolean);
  }, [data]);

  useEffect(() => {
    form.setFieldValue('payment_type', options?.[0]?.value);
  }, [form, options]);

  return (
    <CustomSelect
      label="Payment Type"
      options={options}
      name={'payment_type'}
    />
  );
};

const GiftCardComponent = ({ setGiftCard }) => {
  const params = useGlobalParams({});
  const { data, isFetching } = useGetAllGiftCardQuery({ params });

  const options = data?.results?.giftcard
    ?.filter((item) => new Date(item.expired_date) > new Date())
    ?.map((item) => {
      return {
        value: item.id.toString() + '-' + item.amount,
        label: item.card_no,
        amount: item.amount,
      };
    });

  // const form = Form.useFormInstance();

  const onSelect = (option) => {
    // const paidAmount = form.getFieldValue('paid_amount');
    // const payableAmount = parseFloat(paidAmount);

    setGiftCard(option?.amount);
  };

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        isLoading={isFetching}
        options={options}
        name="gift_card_id"
        label="Gift Card Number"
        required={true}
        onChange={(value, option) => onSelect(value, option)}
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
  const currency = useSelector(useCurrency);
  const paymentStatus = Form.useWatch('payment_status', form);

  const receivedAmount = Form.useWatch('recieved_amount', form);
  const paidAmount = Form.useWatch('paid_amount', form);

  const paymentType = Form.useWatch('payment_type', form);

  const change = Number(
    parseFloat(receivedAmount ?? 0) - parseFloat(paidAmount ?? 0)
  ).toFixed(2);

  useEffect(() => {
    if (paymentType !== 'Gift Card') {
      form.resetFields(['gift_card_id']);
    }
  }, [paymentType, form]);

  const [giftCard, setGiftCard] = useState(undefined);

  console.log(Number(paidAmount));

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
            required={giftCard ? !(Number(paidAmount) === 0) : true}
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
          <Col {...(paymentType === 'Gift Card' ? mdColLayout : fullColLayout)}>
            <div className="py-9 text-lg font-semibold">
              Change: {showCurrency(change, currency)}
            </div>
          </Col>
        )}

        {paymentType === 'Gift Card' &&
          (giftCard ? (
            <Col {...mdColLayout}>
              <div className="py-9 text-lg font-semibold">
                Gift Card Amount: {showCurrency(giftCard, currency)}
              </div>
            </Col>
          ) : (
            <Col {...mdColLayout}>
              <div className="py-9 text-lg font-semibold">
                Gift Card Not Applied
              </div>
            </Col>
          ))}

        {paymentStatus === 'Partial' && (
          <Col {...fullColLayout}>
            <div className="py-9 text-lg font-semibold">
              Due: {Number(paidAmount - receivedAmount || 0).toFixed(2)}
            </div>
          </Col>
        )}

        {paymentType === 'Gift Card' && (
          <GiftCardComponent setGiftCard={setGiftCard} />
        )}
        {paymentType === 'Card' && <CardComponent />}
        {paymentType === 'Cheque' && <ChequeComponent />}
      </>
    )
  );
};
