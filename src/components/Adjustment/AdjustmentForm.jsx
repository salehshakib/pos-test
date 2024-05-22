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
import { ProductTableComponent } from "./overview/ProductTableComponent";
import { SearchProductComponent } from "./overview/SearchProductComponent";

const SelectWarehouse = () => {
  const { data, isLoading } = useGetWarehousesQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  return (
    <CustomSelect
      label="Warehouse"
      required={true}
      options={options}
      isLoading={isLoading}
      showSearch={true}
      name="warehouse_id"
    />
  );
};

const AdjustmentForm = ({ options, ...props }) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <SelectWarehouse />
        </Col>

        <Col {...fullColLayout}>
          <SearchProductComponent options={options} />
        </Col>

        <ProductTableComponent />

        <Col {...fullColLayout}>
          <CustomUploader label="Attach Documents" name={"attachment"} />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Note"
            multiple={true}
            type={"textarea"}
            name={"note"}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AdjustmentForm;
