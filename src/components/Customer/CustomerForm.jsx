import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useGetAllCustomerGroupQuery } from "../../redux/services/customerGroup/customerGroupApi";

const CustomerGroupComonent = () => {
  const { data, isLoading } = useGetAllCustomerGroupQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.customergroup?.map((item) => ({
    value: item.id?.toString(),
    label: item.name,
  }));
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
            required={true}
            name={"company_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Email"
            type={"email"}
            required={true}
            name={"email"}
          />
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
          <CustomInput
            label="Country"
            type={"text"}
            required={true}
            name={"country"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="City"
            type={"text"}
            required={true}
            name={"city"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="State"
            type={"text"}
            required={true}
            name={"state"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Postal Code"
            type={"number"}
            required={true}
            name={"postal_code"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Address"
            type={"textarea"}
            required={true}
            name={"address"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};
