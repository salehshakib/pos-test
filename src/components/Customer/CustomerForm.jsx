import { Col, Form, Row } from "antd";
import { useGetAllCustomerGroupQuery } from "../../redux/services/customerGroup/customerGroupApi";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../../layout/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useEffect } from "react";

const CustomerGroupComonent = () => {
  const form = Form.useFormInstance();

  const { data, isLoading } = useGetAllCustomerGroupQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.customergroup?.map((item) => ({
    value: item.id?.toString(),
    label: item.name,
  }));

  useEffect(() => {
    form.setFieldValue("customer_group_id", options?.[0]?.value);
  }, [form, options]);

  return (
    <CustomSelect
      label="Customer Group"
      required={true}
      options={options}
      isLoading={isLoading}
      showSearch={true}
      name="customer_group_id"
    />
  );
};

export const CustomerForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomerGroupComonent />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Name"
            type={"text"}
            required={true}
            name={"name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Company Name"
            type={"text"}
            name={"company_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="Email" type={"email"} name={"email"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Phone Number"
            type={"phone"}
            required={true}
            name={"phone_number"}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput label="Country" type={"text"} name={"country"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="City" type={"text"} name={"city"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput label="State" type={"text"} name={"state"} />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Postal Code"
            type={"number"}
            name={"postal_code"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput label="Address" type={"textarea"} name={"address"} />
        </Col>
      </Row>
    </CustomForm>
  );
};
