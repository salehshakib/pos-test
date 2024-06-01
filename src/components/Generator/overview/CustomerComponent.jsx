import { useGetAllCustomerQuery } from "../../../redux/services/customer/customerApi";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const CustomerComponent = () => {
  const { data, isLoading } = useGetAllCustomerQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.customer?.map((customer) => ({
    value: customer?.id?.toString(),
    label: customer?.name,
  }));
  return (
    <CustomSelect
      label="Select Customer"
      options={options}
      isLoading={isLoading}
      name="customer_id"
    />
  );
};
