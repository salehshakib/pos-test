import CustomSelect from "../../Shared/Select/CustomSelect";

const options = [
  {
    value: "Exclusive",
    label: "Exclusive",
  },
  {
    value: "Inclusive",
    label: "Inclusive",
  },
];

const TaxTypeComponent = () => {
  return (
    <CustomSelect
      label="Tax Method"
      options={options}
      required={true}
      name={"tax_method"}
    />
  );
};

export default TaxTypeComponent;
