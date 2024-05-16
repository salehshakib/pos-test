import { FaPlus } from "react-icons/fa";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";

const options = [{ value: "test", label: "test" }];

export const BrandComponent = () => {
  function handleAddBrand() {
    console.log("hello");
  }
  return (
    <CustomSelectButton
      label="Brand"
      options={options}
      icon={<FaPlus className="text-xl" />}
      onClick={handleAddBrand}
      name={"brand"}
    />
  );
};
