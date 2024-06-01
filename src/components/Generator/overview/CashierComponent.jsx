import { useGetAllCashierQuery } from "../../../redux/services/cashier/cashierApi";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const CashierComponent = () => {
  const { data, isLoading } = useGetAllCashierQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.cashier?.map((cashier) => ({
    value: cashier?.id?.toString(),
    label: cashier?.name,
  }));
  return (
    <CustomSelect
      label="Select Cashier"
      options={options}
      isLoading={isLoading}
      name="cashier_id"
    />
  );
};
