import { Form } from "antd";
import CustomSelect from "../../Shared/Select/CustomSelect";

const options = [
  { value: "Standard", label: "Standard" },
  { value: "Combo", label: "Combo" },
  { value: "Digital", label: "Digital" },
  { value: "Service", label: "Service" },
];

const ProductTypeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("type", form);

  if (!productType) {
    form.setFieldValue("type", "Standard");
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
