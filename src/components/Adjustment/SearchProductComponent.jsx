import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DebouceSelect from "../Shared/Select/DebounceSelect";

export const SearchProductComponent = () => {
  const [value, setValue] = useState(null);
  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setValue(value);
    }
  }, 1000);

  console.log(value);

  // const { data, isLoading } = useGetWarehousesQuery({});

  const options = [
    {
      value: "1",
      label: "Product 1",
    },
    {
      value: "2",
      label: "Product 2",
    },
    {
      value: "3",
      label: "Product 3",
    },
    {
      value: "4",
      label: "Product 4",
    },
  ];

  return (
    <DebouceSelect
      label="Search Product"
      onSearch={debounce}
      placeholder={"Product Name"}
      required={true}
      options={options}
      name={"product_name"}
      mode={"multiple"}
      // isLoading={isLoading}
    />
  );
};
