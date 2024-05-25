import { Col, Row } from "antd";
import { baseUnit } from "../../assets/data/baseUnit";
import { useGetTypesQuery } from "../../redux/services/types/typesApi";
import CustomForm from "../Shared/Form/CustomForm";
import { mdColLayout, rowLayout } from "../../layout/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";

const BaseUnit = () => {
  // const form = Form.useFormInstance();
  // const base_unit = Form.useWatch("base_unit", form);

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
      value: item.name,
      label: item.name,
    };
  });

  return (
    <Col {...mdColLayout}>
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
        <Col {...mdColLayout}>
          <CustomInput
            label={"Unit Name"}
            type={"text"}
            name={"name"}
            required={true}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label={"Unit Code"}
            type={"text"}
            name={"code"}
            required={true}
          />
        </Col>
        <Col {...mdColLayout}>
          <BaseUnit />
        </Col>

        <TypeUnit />
      </Row>
    </CustomForm>
  );
};

export default UnitForm;
