import { Form } from "antd";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../utilities/hooks/useParams";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useEffect } from "react";

export const WarehouseComponent = ({ name = "warehouse_id" }) => {
  const form = Form.useFormInstance();

  const params = useGlobalParams({
    // isPagination: true,
    // isDefaultParams: false,
    // params: {
    //   parent: 1,
    // },
    // isRelationalParams: true,
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse?.id?.toString(),
    label: warehouse?.name,
  }));

  //get data from redux store
  useEffect(() => {
    if (options?.length) {
      form.setFieldValue(name, options[0].value);
    }
  }, [form, name, options]);

  return (
    <CustomSelect
      label="Warehouse"
      showSearch={true}
      isLoading={isLoading}
      options={options}
      name={name}
      required={true}
    />
  );
};
