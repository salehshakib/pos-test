import { Col, Row, Select } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";

// const prefixSelector = (
//   <Form.Item name="prefix" noStyle>
//     <Select
//       style={{
//         width: 70,
//       }}
//     >
//       <Option value="880">+880</Option>
//       <Option value="87">+87</Option>
//     </Select>
//   </Form.Item>
// );

const PhoneNumberComponent = () => {
  return (
    <CustomInput
      label="Phone Number"
      type={"phone"}
      required={true}
      name={"phone"}
      prefix={"+88"}
      // addonBefore={prefixSelector}
      placeholder={"Phone Number"}
      noStyle={false}
    />
  );
};

const WarehouseForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      className=""
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Warehouse Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Brand Name"}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            label="Email"
            type={"email"}
            name={"email"}
            placeholder={"Email Address"}
          />
        </Col>
        <Col {...colLayout}>
          <PhoneNumberComponent />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Address"
            type={"textarea"}
            required={true}
            name={"address"}
            placeholder={"Address"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default WarehouseForm;
