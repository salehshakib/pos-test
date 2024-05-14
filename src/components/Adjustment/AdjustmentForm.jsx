import { Col, Row } from "antd";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
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
import { SearchProductComponent } from "./SearchProductComponent";

const SelectWarehouse = () => {
  const { data, isLoading } = useGetWarehousesQuery({});

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id,
    label: warehouse.name,
  }));

  return (
    <CustomSelect
      label="Warehouse"
      type={"text"}
      required={true}
      options={options}
      isLoading={isLoading}
      showSearch={true}
      name="warehouse_id"
    />
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
        <Col {...mdColLayout}>
          <SelectWarehouse />
        </Col>

        <Col {...fullColLayout}>
          <SearchProductComponent />
        </Col>
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
