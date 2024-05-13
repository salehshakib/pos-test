import { Col, Row } from "antd";
import { useDebouncedCallback } from "use-debounce";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomAutoComplete from "../Shared/AutoComplete/CustomAutoComplete";
import CustomForm from "../Shared/Form/CustomForm";
import {
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { ProductTableComponent } from "./ProductTableComponent";

const SelectWarehouse = () => {
  const { data, isLoading } = useGetWarehousesQuery({});
  console.log(data);

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.name,
  }));

  return (
    <Col {...mdColLayout}>
      <CustomSelect
        label="Warehouse"
        type={"text"}
        required={true}
        options={options}
        isLoading={isLoading}
        showSearch={true}
        name="warehouse_id"
      />
    </Col>
  );
};

const SearchProductComponent = () => {
  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      console.log(value);
    }
  }, 1000);

  const options = [
    {
      value: "1",
      label: "Product 1",
    },
    {
      value: "2",
      label: "Product 2",
    },
  ];

  return (
    <Col {...mdColLayout}>
      <CustomAutoComplete
        label="Search Product"
        onSearch={debounce}
        requireMsg={"Product Name"}
        placeholder={"Type Product Name"}
        required={true}
        options={options}
        name={"product_name"}
      />
    </Col>
  );
};

const AdjustmentForm = ({ handleSubmit, isLoading, fields }) => {
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
      <Row {...rowLayout}>
        <SelectWarehouse />

        <SearchProductComponent />
      </Row>
      <Row {...rowLayout}>
        <ProductTableComponent />
      </Row>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomUploader
            label="Attach Documents"
            multiple={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Note"
            multiple={true}
            type={"textarea"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AdjustmentForm;
