import { Col } from "antd";
import { colLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";

export const WarehouseComponent = () => {
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
    <>
      <Col {...colLayout}>
        <CustomSelect
          label="Warehouse (From)"
          placeholder={"Warehouse (From)"}
          showSearch={true}
          isLoading={isLoading}
          options={options}
          name="from_warehouse_id"
          required={true}
        />
      </Col>
      <Col {...colLayout}>
        <CustomSelect
          label="Warehouse (To)"
          placeholder={"Warehouse (To)"}
          showSearch={true}
          isLoading={isLoading}
          options={options}
          name="to_warehouse_id"
          required={true}
        />
      </Col>
    </>
  );
};
