import { Col } from "antd";
import { largeLayout } from "../../layout/FormLayout";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomSelect from "../Shared/Select/CustomSelect";

export const WarehouseTransferComponent = () => {
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
      <Col {...largeLayout}>
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
      <Col {...largeLayout}>
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
