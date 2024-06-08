import { useEffect } from "react";
import CustomSelect from "../../Shared/Select/CustomSelect";
import { Col, Form } from "antd";
import { colLayout, fullColLayout } from "../../../layout/FormLayout";
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
    {
      value: "Deposit",
      label: "Deposit",
    },
    {
      value: "Points",
      label: "Points",
    },
  ];

  return <CustomSelect label="Paid By" options={options} name={"paid_by"} />;
};

const GiftCardComponent = () => {
  const { data, isFetching } = useGetAllGiftCardQuery({});

  console.log(data);
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
        name="gift_card_number"
        label="Gift Card Number"
        required={true}
      />
    </Col>
  );
};

const ChequeComponent = () => {
  const form = Form.useFormInstance();
  const paidBy = Form.useWatch("paid_by", form);

  return (
    paidBy === "Cheque" && (
      <Col {...fullColLayout}>
        <CustomInput
          type={"text"}
          name="cheque_number"
          label="Cheque Number"
          required={true}
        />
      </Col>
    )
  );
};

export const PaymentTypeComponent = () => {
  const form = Form.useFormInstance();
  const paymentStatus = Form.useWatch("payment_status", form);

  const paidBy = Form.useWatch("paid_by", form);

  return (
    (paymentStatus === "Due" || paymentStatus === "Partial") && (
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
          {" "}
          <CustomInput
            type={"text"}
            name="payment_reciever"
            label="Payment Receiver"
          />
        </Col>

        <ChequeComponent />

        {paidBy === "Gift Card" && <GiftCardComponent />}

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
