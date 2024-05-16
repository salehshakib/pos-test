import { Form } from "antd";
import CustomSelect from "../Shared/Select/CustomSelect";

const options = [
  {
    value: "Code 128",
    label: "Code 128",
  },
  {
    value: "Code 39",
    label: "Code 39",
  },
  {
    value: "UPC-A",
    label: "UPC-A",
  },
  {
    value: "UPC-E",
    label: "UPC-E",
  },
  {
    value: "EAN-8",
    label: "EAN-8",
  },
  {
    value: "EAN-13",
    label: "EAN-13",
  },
];
const BarCodeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch("product_type", form);

  if (!productType) {
    form.setFieldValue("symbology", "Code 128");
  }

  return (
    <CustomSelect
      label="Barcode Symbology"
      options={options}
      required={true}
      name={"symbology"}
    />
  );
};

export default BarCodeComponent;
