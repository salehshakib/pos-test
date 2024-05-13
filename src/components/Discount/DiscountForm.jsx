import { Col, Form, Row } from "antd";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";

const ApplicableFormItem = () => {
  const form = Form.useWatch();

  console.log(form.getFieldsValue("applicable_for"));

  return (
    <CustomSelect
      label="Applicable For"
      options={[
        {
          label: "All Products",
          value: "all",
        },
        {
          label: "Specific Products",
          value: "specific",
        },
      ]}
      name={"applicable_for"}
      required={true}
    />
  );
};

const DiscountForm = ({ handleSubmit, isLoading, fields }) => {
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
            label="Name"
            type={"text"}
            required={true}
            name={"name"}
            placeholder={"Name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect label="Discount Plan" required={true} />
        </Col>
        <Col {...colLayout}>
          <ApplicableFormItem />
        </Col>
        <Col {...colLayout}>
          <CustomDatepicker type={"date"} label="Valid From" required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomDatepicker type={"date"} label="Vaild Till" required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            options={[
              {
                label: "Percentage",
                value: "percentage",
              },
              {
                label: "Flat",
                value: "flat",
              },
            ]}
            label="Discount Type"
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput type={"number"} label="Value" required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomInput type={"number"} label="Maximum Qty" required={true} />
        </Col>
        <Col {...colLayout}>
          <CustomInput type={"number"} label="Minimum Qty" required={true} />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Col {...fullColLayout}></Col>
      </Row>
    </CustomForm>
  );
};

export default DiscountForm;
