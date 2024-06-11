import { useGetAllSupplierQuery } from "../../../redux/services/supplier/supplierApi";
import CustomSelect from "../../Shared/Select/CustomSelect";

export const SupplierComponent = () => {
  const { data, isLoading } = useGetAllSupplierQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.supplier?.map((supplier) => ({
    value: supplier?.id?.toString(),
    label: supplier?.name,
  }));
  return (
    <CustomSelect
      label="Supplier"
      options={options}
      isLoading={isLoading}
      required={true}
      name="supplier_id"
    />
  );
};
