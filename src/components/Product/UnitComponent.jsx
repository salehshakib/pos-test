import { Col, Form } from "antd";
import { baseUnit } from "../../assets/data/baseUnit";
import CustomSelect from "../Shared/Select/CustomSelect";
import { colLayout } from "../Shared/Form/FormLayout";

const ProductUnit = () => {
  const options = baseUnit.map((item) => {
    return {
      value: item?.name,
      label: `${item?.name} (${item?.symbol})`,
    };
  });

  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Product Unit"
        options={options}
        required={true}
        name={"product_unit"}
      />
    </Col>
  );
};

function getSubunits(baseUnitData) {
  const unit = baseUnit.find((unit) => unit.name === baseUnitData);
  return unit
    ? unit.subunits.map((item) => {
        return {
          value: item.name,
          label: `${item.name} (${item.symbol})`,
        };
      }) || []
    : [];
}

const SaleUnit = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch("product_unit", form);

  const options = getSubunits(productData);

  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Sale Unit"
        options={options}
        required={true}
        name={"sale_unit"}
      />
    </Col>
  );
};

const PurchaseUnit = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch("product_unit", form);

  const options = getSubunits(productData);

  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Puchase Unit"
        options={options}
        required={true}
        name={"purchase_unit"}
      />
    </Col>
  );
};

const UnitComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  console.log(productType);

  if (productType === "standard") {
    return (
      <>
        <ProductUnit />
        <SaleUnit />
        <PurchaseUnit />
      </>
    );
  }
};

export default UnitComponent;
