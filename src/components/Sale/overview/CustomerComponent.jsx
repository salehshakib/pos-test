import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetAllCustomerQuery } from "../../../redux/services/customer/customerApi";
import CustomerCreate from "../../Customer/CustomerCreate";
import { CustomSelectButton } from "../../Shared/Select/CustomSelectButton";

export const CustomerComponent = () => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const { data, isLoading } = useGetAllCustomerQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });
  const options = data?.results?.customer?.map((item) => {
    return {
      value: item.id?.toString(),
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
        label="Customer"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        name={"customer_id"}
        isLoading={isLoading}
        required={"true"}
      />

      <CustomerCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};
