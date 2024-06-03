import { Col, Row } from "antd";
import { fullColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { AdjustmentProductTable } from "./overview/AdjustmentProductTable";

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
        <Col {...fullColLayout}>
          <SelectWarehouse />
        </Col>

        {/* <Col {...fullColLayout}> */}
        {/* <SearchProductComponent options={options} /> */}
        {/* <ProductController /> */}
        {/* </Col> */}

        <AdjustmentProductTable />

        {/* <ProductTableComponent /> */}

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
