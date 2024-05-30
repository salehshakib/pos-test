import { Col, Form, Row } from "antd";
import { RiRefreshLine } from "react-icons/ri";
import { mdColLayout, rowLayout } from "../../layout/FormLayout";
import { generateRandomCode } from "../../utilities/lib/generateCode";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInputButton from "../Shared/Input/CustomInputButton";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomInput from "../Shared/Input/CustomInput";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import { useEffect } from "react";

const CouponCodeComponent = () => {
  const form = Form.useFormInstance();

  const generate = () => {
    const randomCode = generateRandomCode(6);

    form?.setFieldValue("code", randomCode);
  };

  return (
    <CustomInputButton
      label="Coupon Code"
      type={"text"}
      required={true}
      name={"code"}
      placeholder={"Generate Coupon Code"}
      onClick={generate}
      icon={<RiRefreshLine className="text-xl" />}
      btnText={"Generate"}
    />
  );
};

const options = [
  {
    value: "Percentage",
    label: "Percentage",
  },
  {
    value: "Fixed",
    label: "Fixed",
  },
];

const TypeComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("type", "Percentage");
  }, [form]);

  return (
    <CustomSelect
      label="Coupon Code"
      required={true}
      name={"type"}
      options={options}
    />
  );
};

const MinAmountComponent = () => {
  const form = Form.useFormInstance();

  const type = Form.useWatch("type", form);

  return (
    type === "Fixed" && (
      <Col {...mdColLayout} className="">
        <CustomInput
          label="Minimum Amount"
          type={"number"}
          required={true}
          name={"minimum_amount"}
        />
      </Col>
    )
  );
};

const CouponsForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CouponCodeComponent />
        </Col>
        <Col {...mdColLayout}>
          <TypeComponent />
        </Col>

        <MinAmountComponent />

        <Col {...mdColLayout}>
          <CustomInput
            label="Amount"
            type={"number_with_percent"}
            required={true}
            name={"amount"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Quantity"
            type={"number"}
            required={true}
            name={"qty"}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomDatepicker label={"Expired Date"} name={"expired_date"} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default CouponsForm;
