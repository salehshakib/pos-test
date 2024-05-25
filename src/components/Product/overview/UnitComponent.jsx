import { Col, Form } from "antd";
import { useGetAllUnitQuery } from "../../../redux/services/unit/unitApi";
import { colLayout } from "../../../layout/FormLayout";
import CustomSelect from "../../Shared/Select/CustomSelect";

const ProductUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Product Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={"unit_id"}
        showSearch={true}
      />
    </Col>
  );
};

const PurchaseUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Puchase Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={"purchase_unit_id"}
        showSearch={true}
      />
    </Col>
  );
};

const SaleUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Sale Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={"sale_unit_id"}
        showSearch={true}
      />
    </Col>
  );
};

const UnitComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  const { data, isLoading } = useGetAllUnitQuery({
    params: {
      selectValue: ["name", "id", "for"],
    },
  });

  console.log(data);

  const productUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "product-unit")
    .map((unit) => ({ value: unit.id.toString(), label: unit.name }));

  const saleUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "sale-unit")
    .map((unit) => ({ value: unit.id.toString(), label: unit.name }));

  const purchaseUnits = data?.results?.unit
    ?.filter((unit) => unit.for === "purchase-unit")
    .map((unit) => ({ value: unit.id.toString(), label: unit.name }));

  if (productType === "Standard") {
    return (
      <>
        <ProductUnit options={productUnits} isLoading={isLoading} />
        <PurchaseUnit options={purchaseUnits} isLoading={isLoading} />
        <SaleUnit options={saleUnits} isLoading={isLoading} />
      </>
    );
  }
};

export default UnitComponent;
