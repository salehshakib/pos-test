import { Col, Form } from "antd";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fullColLayout } from "../Shared/Form/FormLayout";
import DebouceSelect from "../Shared/Select/DebounceSelect";
import ComboTableComponent from "./ComboTableComponent";

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

const SearchProductComponent = () => {
  const [keyword, setKeyword] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  return (
    <Col {...fullColLayout}>
      <DebouceSelect
        label="Product"
        onSearch={debounce}
        placeholder={"Product Name"}
        required={true}
        options={options}
        name={"product_name"}
        mode={"multiple"}
        // isLoading={isLoading}
      />
    </Col>
  );
};

const ComboProductsComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (productType === "combo") {
    return (
      <>
        <SearchProductComponent />
        <ComboTableComponent />
      </>
    );
  }
};

export default ComboProductsComponent;
