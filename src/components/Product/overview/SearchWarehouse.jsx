import { useGetWarehousesQuery } from "../../../redux/services/warehouse/warehouseApi";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const SearchWarehouse = ({ name }) => {
  const { data, isFetching } = useGetWarehousesQuery({
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
      isLoading={isFetching}
      showSearch={true}
      name={name}
    />
  );
};
