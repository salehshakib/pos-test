import { Form } from "antd";
import CustomSelect from "../Shared/Select/CustomSelect";

const options = [
  { value: "standard", label: "Standard" },
  { value: "combo", label: "Combo" },
  { value: "digital", label: "Digital" },
  { value: "service", label: "Service" },
];

const ProductTypeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (!productType) {
    form.setFieldValue("product_type", "standard");
  }
  return (
    <CustomSelect
      label="Product Type"
      required={true}
      options={options}
      name={"product_type"}
    />
  );
};

export default ProductTypeComponent;
