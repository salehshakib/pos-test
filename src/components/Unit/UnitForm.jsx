import { Col, Form, Row } from "antd";
import { baseUnit } from "../../assets/data/baseUnit";
import { fullColLayout, mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetTypesQuery } from "../../redux/services/types/typesApi";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomRadio from "../Shared/Radio/CustomRadio";
import CustomSelect from "../Shared/Select/CustomSelect";

const BaseUnit = () => {
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

const OperatorComponent = () => {
  const form = Form.useFormInstance();
  const baseUnit = Form.useWatch("base_unit", form);

  const options = [
    {
      value: "+",
      label: <span className="font-semibold">Addition (+)</span>,
    },
    {
      value: "-",
      label: <span className="font-semibold">Subtraction (-)</span>,
    },
    {
      value: "*",
      label: <span className="font-semibold">Multiply (*)</span>,
    },
    {
      value: "/",
      label: <span className="font-semibold">Division (/)</span>,
    },
  ];

  if (baseUnit) {
    return (
      <>
        <Col {...fullColLayout}>
          <CustomRadio
            options={options}
            name={"operator"}
            label={"Operator"}
            required={true}
          />
        </Col>

        <Col {...fullColLayout}>
          <CustomInput
            label={"Operator Value"}
            type={"number"}
            name={"operation_value"}
            required={true}
          />
        </Col>
      </>
    );
  }
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

        <OperatorComponent />
      </Row>
    </CustomForm>
  );
};

export default UnitForm;
