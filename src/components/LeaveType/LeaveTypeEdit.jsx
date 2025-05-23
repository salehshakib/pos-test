import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetLeaveTypeDetailsQuery,
  useUpdateLeaveTypeMutation,
} from '../../redux/services/settings/leaveType/leaveTypeApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { LeaveTypeForm } from './LeaveTypeForm';

export const LeaveTypeEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetLeaveTypeDetailsQuery(
    { id },
    { skip: !id }
  );

  const [updateLeaveType, { isLoading }] = useUpdateLeaveTypeMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      need_attachment: values?.need_attachment ? '1' : '0',
      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    const { data, error } = await updateLeaveType({
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
      title={'Edit Leave Type'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <LeaveTypeForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
