import { Col, Row } from "antd";
import CustomCheckbox from "../Shared/Checkbox/CustomCheckbox";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import ApplicableForm from "./overview/ApplicableForm";
import { SpecificProductComponent } from "./overview/SpecificProductComponent";

const weekDays = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
  {
    label: "Sunday",
    value: "sunday",
  },
];

const DiscountForm = (props) => {
  return (
    <CustomForm {...props}>
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

        <ApplicableForm />
      </Row>

      <SpecificProductComponent />

      <Row {...rowLayout}>
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
        <Col {...fullColLayout}>
          <CustomCheckbox
            name="valid_on"
            mode="group"
            label="Valid on the following days"
            options={weekDays}
            defaultValue={["sunday", "saturday"]}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default DiscountForm;
