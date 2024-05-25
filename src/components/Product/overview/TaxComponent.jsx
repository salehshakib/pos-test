import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import { CustomSelectButton } from "../../Shared/Select/CustomSelectButton";
import TaxCreate from "../../Tax/TaxCreate";

export const TaxComponent = () => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const { data, isFetching } = useGetAllTaxQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });
  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        label="Product Tax"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        name={"tax_id"}
        isLoading={isFetching}
      />

      <TaxCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};
