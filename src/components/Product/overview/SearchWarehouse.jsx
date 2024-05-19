import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useGetWarehousesQuery } from "../../../redux/services/warehouse/warehouseApi";
import DebouceSelect from "../../Shared/Select/DebounceSelect";

export const SearchWarehouse = () => {
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
      name="warehouse_id"
    />
  );
};

// const WarehouseComponent = () => {
//   const form = Form.useFormInstance();
//   const has_different_price = Form.useWatch("has_differnet_price", form);

//   console.log(has_different_price);

//   return (

//   );
// };

// export default WarehouseComponent;
