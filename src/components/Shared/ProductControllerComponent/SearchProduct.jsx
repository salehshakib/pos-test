import { AutoComplete, Col, message, Spin } from "antd";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import { fullColLayout } from "../../../layout/FormLayout";
import { useGetAllProductsQuery } from "../../../redux/services/product/productApi";

export const SearchProduct = ({ setProducts, products }) => {
  const [keyword, setKeyword] = useState(null);
  const [value, setValue] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  const { data, isFetching } = useGetAllProductsQuery(
    {
      params: {
        keyword,
      },
    },
    {
      skip: !keyword,
    }
  );

  const loadingContent = (
    <div className="flex items-center justify-center ">
      <div className="text-center text-lg ">
        <Spin />
      </div>
    </div>
  );

  console.log(products);

  const options = isFetching
    ? [
        {
          value: "loading",
          label: loadingContent,
        },
      ]
    : data?.results?.product?.map((product) => ({
        value: product.id.toString(),
        label: product.name,
        product: product,
      })) ?? [];

  const onSelect = (_, option) => {
    console.log(option);

    setProducts((prevProducts) => {
      const productExists = prevProducts.some((product) => {
        console.log(product);

        return product?.id === option?.product?.id;
      });

      if (!productExists) {
        return [...prevProducts, option.product];
      }

      // If the product already exists, return the previous list without changes
      message.warning("Product already exists in the list");
      return prevProducts;
    });
    setValue(null);
  };

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Col {...fullColLayout}>
      {/* <Row align={"middle"} justify={"start"}>
        <Col span={2} className="border-2 rounded-md ">
          hello
        </Col>
        <Col span={22}> */}
      <AutoComplete
        options={options}
        className="mt-1 w-full"
        size="large"
        onSelect={onSelect}
        onSearch={debounce}
        value={value}
        onChange={onChange}
        placeholder="Search Product"
        suffixIcon={<FaSearch />}
        allowClear={true}
      />
      {/* </Col>
      </Row> */}
    </Col>
  );
};
