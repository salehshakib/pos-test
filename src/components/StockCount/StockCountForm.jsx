import { Col, Row } from "antd";
import { mdColLayout, rowLayout } from "../../layout/FormLayout";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomForm from "../Shared/Form/CustomForm";
import CustomSelect from "../Shared/Select/CustomSelect";
import PartialForm from "./PartialForm";

const options = [
  {
    // full
    value: "Full",
    label: "Full",
  },
  {
    // partial
    value: "Partial",
    label: "Partial",
  },
];

const StockCountForm = (props) => {
  const { data, isLoading } = useGetWarehousesQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const warehouseOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Warehouse"
            type={"text"}
            required={true}
            options={warehouseOptions}
            isLoading={isLoading}
            showSearch={true}
            mode="multiple"
            name="stock_warehouse_ids"
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Type"
            options={options}
            name={"type"}
            required={true}
          />
        </Col>

        <PartialForm />
      </Row>
    </CustomForm>
  );
};

export default StockCountForm;
