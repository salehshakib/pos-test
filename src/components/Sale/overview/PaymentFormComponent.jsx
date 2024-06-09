import { useEffect } from "react";
import CustomSelect from "../../Shared/Select/CustomSelect";
import { Col, Form } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
} from "../../../layout/FormLayout";
import CustomInput from "../../Shared/Input/CustomInput";
import { useGetAllGiftCardQuery } from "../../../redux/services/giftcard/giftcard/giftCardApi";

const PaidByComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("paid_by", "Cash");
  }, [form]);

  const options = [
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Gift Card",
      label: "Gift Card",
    },
    {
      value: "Card",
      label: "Card",
    },
    {
      value: "Cheque",
      label: "Cheque",
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
      name={"payment_type"}
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

  console.log(data);

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
      value: "Master Card (Credit)",
      label: "Master Card (Credit)",
    },
    {
      //visa credit
      value: "Visa Card (Credit)",
      label: "Visa Card (Credit)",
    },
    {
      //master debit
      value: "Master Card (Debit)",
      label: "Master Card (Debit)",
    },
    {
      //visa debit
      value: "Visa Card (Debit)",
      label: "Visa Card (Debit)",
    },
    {
      //american express
      value: "American Express",
      label: "American Express",
    },
  ];

  return (
    <>
      <Col {...mdColLayout}>
        <CustomInput
          type={"text"}
          name="issuer"
          label="Issuer Name"
          required={true}
        />
      </Col>
      <Col {...mdColLayout}>
        <CustomSelect
          options={options}
          name="card"
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
          type={"text"}
          name="bank"
          label="Bank Name"
          required={true}
        />
      </Col>
      <Col {...mdColLayout}>
        <CustomInput
          type={"text"}
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
  const paymentStatus = Form.useWatch("payment_type", form);

  return (
    (paymentStatus === "Paid" || paymentStatus === "Partial") && (
      <>
        <Col {...colLayout}>
          <PaidByComponent />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            type={"number"}
            name="recieved_amount"
            label="Recieved Amount"
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            type={"number"}
            name="paid_amount"
            label="Paid Amount"
            required={true}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            type={"text"}
            name="payment_receiver"
            label="Payment Receiver"
          />
        </Col>

        {paymentStatus === "Gift Card" && <GiftCardComponent />}
        {paymentStatus === "Card" && <CardComponent />}
        {paymentStatus === "Cheque" && <ChequeComponent />}

        <Col {...fullColLayout}>
          <CustomInput
            type={"textarea"}
            name="payment_note"
            label="Payment Note"
          />
        </Col>
      </>
    )
  );
};
