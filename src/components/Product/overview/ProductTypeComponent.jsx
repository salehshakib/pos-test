import { Form } from "antd";
import CustomSelect from "../../Shared/Select/CustomSelect";

const options = [
  { value: "standard", label: "Standard" },
  { value: "combo", label: "Combo" },
  { value: "digital", label: "Digital" },
  { value: "service", label: "Service" },
];

const ProductTypeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (!productType) {
    form.setFieldValue("type", "standard");
  }
  return (
    <CustomSelect
      label="Product Type"
      required={true}
      options={options}
      name={"type"}
    />
  );
};

export default ProductTypeComponent;
