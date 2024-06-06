import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";
import { setProduct } from "../../../redux/services/product/productSlice";
import DebouceSelect from "../../Shared/Select/DebounceSelect";

export const SearchProductComponent = ({ options: editOptions = [] }) => {
  const [keyword, setKeyword] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  const { data, isFetching } = useGetAllProductsQuery(
    {
      params: {
        selectValue: ["id", "name", "sku", "buying_price"],
        keyword,
      },
    },
    {
      // skip: !keyword,
    }
  );

  const options = [
    // ...editOptions,
    ...(data?.results?.product?.map((product) => ({
      value: product.id.toString(),
      label: product.name,
      sku: product.sku,
      unitCost: product.buying_price,
    })) ?? []),
  ];

  const dispatch = useDispatch();

  const onSelect = (value, option) => {
    dispatch(
      setProduct({
        value: option.value,
        label: option.label,
        sku: option.sku,
        unitCost: option.unitCost,
      })
    );
  };

  return (
    <DebouceSelect
      label="Product"
      onSearch={debounce}
      placeholder={"Product Name"}
      required={true}
      options={options}
      name={"product_name"}
      mode={"multiple"}
      isLoading={isFetching}
      onSelect={onSelect}
    />
  );
};
