import { FaPlus } from "react-icons/fa";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";

export const TaxComponent = () => {
  const { data, isFetching } = useGetAllTaxQuery({});
  const options = data?.results?.brand?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  function handleProductTax() {
    console.log("first");
  }
  return (
    <CustomSelectButton
      label="Product Tax"
      showSearch={true}
      options={options}
      icon={<FaPlus className="text-xl" />}
      onClick={handleProductTax}
      name={"tax"}
      isLoading={isFetching}
    />
  );
};
