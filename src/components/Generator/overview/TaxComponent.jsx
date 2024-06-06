import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const TaxComponent = () => {
  const { data, isFetching } = useGetAllTaxQuery({});

  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });
  return (
    <CustomSelect
      label="Order Tax"
      options={options}
      name={"tax_id"}
      isLoading={isFetching}
    />
  );
};
