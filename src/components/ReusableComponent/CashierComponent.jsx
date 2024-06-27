import { Form } from "antd";
import { useGetAllCashierQuery } from "../../redux/services/cashier/cashierApi";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../utilities/hooks/useParams";
import CustomSelect from "../Shared/Select/CustomSelect";
import { useEffect } from "react";

export const CashierComponent = ({
  required = true,
  name = "cashier_id",
  label = true,
}) => {
  const form = Form.useFormInstance();

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCashierQuery({ params });

  const options = data?.results?.cashier?.map((cashier) => ({
    value: cashier?.id?.toString(),
    label: cashier?.name,
  }));

  //set redux stored value here
  useEffect(() => {
    if (options?.length && !form.getFieldValue(name)) {
      form.setFieldValue(name, options[0].value);
    }
  }, [form, name, options]);

  return (
    <CustomSelect
      label={label && "Cashier"}
      options={options}
      isLoading={isLoading}
      name={name}
      required={required}
      customStyle={!label}
    />
  );
};
