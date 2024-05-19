import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openTaxDrawer } from "../../../redux/services/drawer/drawerSlice";
import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import { CustomSelectButton } from "../../Shared/Select/CustomSelectButton";
import TaxCreate from "../../Tax/TaxCreate";

export const TaxComponent = () => {
  const dispatch = useDispatch();

  const { data, isFetching } = useGetAllTaxQuery({});
  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  function handleProductTax() {
    dispatch(openTaxDrawer());
  }
  return (
    <>
      <CustomSelectButton
        label="Product Tax"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleProductTax}
        name={"tax_id"}
        isLoading={isFetching}
      />

      <TaxCreate subDrawer={true} />
    </>
  );
};
