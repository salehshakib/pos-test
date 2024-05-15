import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DebouceSelect from "../Shared/Select/DebounceSelect";

export const SearchProductComponent = () => {
  const [keyword, setKeyword] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  console.log(keyword);
  // const { data, isLoading } = useGetpro({});

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
