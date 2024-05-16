import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import DebouceSelect from "../Shared/Select/DebounceSelect";

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

export const SearchProductComponent = ({ options: editOptions }) => {
  const [keyword, setKeyword] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  console.log(editOptions);
  console.log(keyword);
  // const { data, isLoading } = useGetpro({});

  return (
    <DebouceSelect
      label="Product"
      onSearch={debounce}
      placeholder={"Product Name"}
      required={true}
      options={editOptions ?? options}
      name={"product_name"}
      mode={"multiple"}
      // isLoading={isLoading}
    />
  );
};
