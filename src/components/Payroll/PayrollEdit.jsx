import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetPayrollDetailsQuery,
  useUpdatePayrollMutation,
} from '../../redux/services/hrm/payroll/payrollApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { PayrollForm } from './PayrollForm';

export const PayrollEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetPayrollDetailsQuery(
    {
      id,
      params: {
        parent: 1,
      },
    },
    { skip: !id }
  );

  const [updatePayroll, { isLoading }] = useUpdatePayrollMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldValue = [
        ...fieldData,
        {
          name: 'department_id',
          value: data?.employees?.departments?.id.toString(),
          errors: '',
        },
      ];

      setFields(updateFieldValue);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      is_send_email: values?.is_send_email === true ? '1' : '0',
      is_send_message: values?.is_send_message === true ? '1' : '0',
      bonus: values?.bonus ? Number(values?.bonus).toFixed(2) : '0',
      loan: values?.loan ? Number(values?.loan).toFixed(2) : '0',
      salary: Number(values?.salary).toFixed(2),
      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    const { data, error } = await updatePayroll({
      id,
      data: formData,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Edit Payroll'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <PayrollForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
