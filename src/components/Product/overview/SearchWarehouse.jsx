import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useGetWarehousesQuery } from "../../../redux/services/warehouse/warehouseApi";
import DebouceSelect from "../../Shared/Select/DebounceSelect";

export const SearchWarehouse = ({ name }) => {
  const [keyword, setKeyword] = useState(null);

  const { data, isFetching } = useGetWarehousesQuery(
    {
      params: {
        selectValue: ["id", "name"],
        keyword,
      },
    },
    {
      skip: !keyword,
    }
  );

  console.log(data);
  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  return (
    <DebouceSelect
      label="Warehouse"
      placeholder={"Warehouse Name"}
      onSearch={debounce}
      mode={"multiple"}
      options={options}
      isLoading={isFetching}
      // name="warehouse_id"
      name={name}
    />
  );
};
