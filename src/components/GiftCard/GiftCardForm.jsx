import { Col, Form, Row } from "antd";
import { RiRefreshLine } from "react-icons/ri";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { generateRandomCode } from "../../utilities/lib/generateCode";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomInputButton from "../Shared/Input/CustomInputButton";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import { useGetAllCustomerQuery } from "../../redux/services/customer/customerApi";

const GiftCardComponent = () => {
  const form = Form.useFormInstance();

  const generate = () => {
    const randomCode = generateRandomCode(8);

    form?.setFieldValue("card_no", randomCode);
  };

  return (
    <CustomInputButton
      label="Coupon Code"
      type={"text"}
      required={true}
      name={"card_no"}
      placeholder={"Generate Coupon Code"}
      onClick={generate}
      icon={<RiRefreshLine className="text-xl" />}
      btnText={"Generate"}
    />
  );
};

const EmployeeComponent = () => {
  const { data, isLoading } = useGetAllCustomerQuery({});

  const options = data?.results?.customer?.map((customer) => ({
    value: customer.id?.toString(),
    label: customer.name,
  }));

  return (
    <CustomSelect
      label="User"
      name={"user"}
      options={options}
      isLoading={isLoading}
      required={true}
    />
  );
};

const CustomerComponent = () => {
  const { data, isLoading } = useGetAllCustomerQuery({});

  const options = data?.results?.customer?.map((customer) => ({
    value: customer.id?.toString(),
    label: customer.name,
  }));

  return (
    <CustomSelect
      label="Customer"
      name={"customer"}
      options={options}
      isLoading={isLoading}
      required={true}
    />
  );
};

const RecieverComponent = () => {
  const form = Form.useFormInstance();
  const user = Form.useWatch("for_user", form);

  if (user) return <EmployeeComponent />;

  return <CustomerComponent />;
};

const GiftCardForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <GiftCardComponent />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="Amount" name={"amount"} required={true} />
        </Col>

        <Col {...fullColLayout} className="mb-2">
          <CustomCheckbox label={"User"} name={"for_user"} />
        </Col>
        <Col {...mdColLayout}>
          <RecieverComponent />
        </Col>
        <Col {...mdColLayout}>
          <CustomDatepicker label={"Expired Date"} name={"expired_date"} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default GiftCardForm;
