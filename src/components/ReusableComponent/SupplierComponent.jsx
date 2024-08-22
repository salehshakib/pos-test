import { useGetAllSupplierQuery } from '../../redux/services/supplier/supplierApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { useInitialFormField } from '../../utilities/lib/updateFormValues/useInitialFormField';
import CustomSelect from '../Shared/Select/CustomSelect';

export const SupplierComponent = ({ name = 'supplier_id' }) => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllSupplierQuery({ params });

  const options = data?.results?.supplier?.map((supplier) => ({
    value: supplier?.id?.toString(),
    label: supplier?.name,
  }));

  useInitialFormField(name, options);

  return (
    <CustomSelect
      label="Supplier"
      options={options}
      isLoading={isLoading}
      required={true}
      name={name}
    />
  );
};
