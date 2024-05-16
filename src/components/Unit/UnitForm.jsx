import { Col, Form, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { baseUnit } from "../../assets/data/baseUnit";
import { useGetTypesQuery } from "../../redux/services/types/typesApi";

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

  const baseUnitOptions = baseUnit.map(({ name, symbol }) => {
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

const TypeUnit = () => {
  const { data, isFetching } = useGetTypesQuery({});

  const options = data?.results?.type?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Type"
        name={"for"}
        options={options}
        placeholder={"Type"}
        isLoading={isFetching}
      />
    </Col>
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

        <TypeUnit />
      </Row>
    </CustomForm>
  );
};

export default UnitForm;
