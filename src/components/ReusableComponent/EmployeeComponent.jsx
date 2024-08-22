import { Form } from 'antd';
import { useEffect } from 'react';
import { useGetAllEmployeeQuery } from '../../redux/services/hrm/employee/employeeApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomSelect from '../Shared/Select/CustomSelect';

//dependency department
export const EmployeeComponent = ({ name = 'employee_id' }) => {
  const form = Form.useFormInstance();
  const departmentId = Form.useWatch('department_id', form);

  const params = useGlobalParams({
    params: {
      department_id: departmentId,
    },
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isFetching } = useGetAllEmployeeQuery(
    { params },
    { skip: !departmentId }
  );

  const options = data?.results?.employee?.map((item) => ({
    value: item?.id?.toString(),
    label: item?.name,
  }));

  useEffect(() => {
    if (departmentId) {
      form.resetFields([name]);
    }
  }, [departmentId, form, name]);

  return (
    <CustomSelect
      label="Employee"
      name={name}
      options={options}
      required={true}
      isLoading={isFetching}
    />
  );
};
