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
  return (
    <CustomSelect
      label="Barcode Symbology"
      options={options}
      required={true}
      name={"barcode_symbology"}
    />
  );
};

export default BarCodeComponent;
