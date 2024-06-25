import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import { useGlobalParams } from "../../../utilities/hooks/useParams";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const TaxComponent = () => {
  const params = useGlobalParams({
    selectValue: ["id", "name"],
  });

  const { data, isFetching } = useGetAllTaxQuery({
    params,
  });

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
