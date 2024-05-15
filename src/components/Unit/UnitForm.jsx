import { Col, Form, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import baseUnit from "../../assets/data/baseUnit.json";

const rowLayout = {
  gutter: 25,
  // align: "middle",
  // justify: "start",
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const BaseUnit = () => {
  const form = Form.useFormInstance();
  const base_unit = Form.useWatch("base_unit", form);

  console.log(base_unit);

  const baseUnitOptions = baseUnit.units.map(({ name, symbol }) => {
    return { label: `${name} (${symbol})`, value: name };
  });
  return (
    <CustomSelect
      label={"Base Unit"}
      name={"base_unit"}
      required={true}
      options={baseUnitOptions}
    />
  );
};

const UnitForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label={"Unit Name"}
            type={"text"}
            name={"name"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label={"Unit Code"}
            type={"text"}
            name={"code"}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <BaseUnit />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default UnitForm;
