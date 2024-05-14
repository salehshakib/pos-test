import CustomSelect from "../Shared/Select/CustomSelect";

const options = [
  { value: "standard", label: "Standard" },
  { value: "combo", label: "Combo" },
  { value: "digital", label: "Digital" },
  { value: "service", label: "Service" },
];

const ProductTypeComponent = () => {
  return (
    <CustomSelect
      label="Product Type"
      type={"text"}
      required={true}
      options={options}
      name={"product_type"}
    />
  );
};

export default ProductTypeComponent;
