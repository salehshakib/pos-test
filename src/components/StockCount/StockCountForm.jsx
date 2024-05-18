import { Col, Row } from "antd";
import CustomForm from "../Shared/Form/CustomForm";
import { mdColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";
import PartialForm from "./PartialForm";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";

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
            name="warehouse_id"
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
