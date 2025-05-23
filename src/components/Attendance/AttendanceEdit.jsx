import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetAttendenceDetailsQuery,
  useUpdateAttendenceMutation,
} from '../../redux/services/hrm/attendence/attendenceApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { AttendanceForm } from './AttendanceForm';

export const AttendanceEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetAttendenceDetailsQuery(
    { id },
    { skip: !id }
  );

  const [updateAttendence, { isLoading }] = useUpdateAttendenceMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldValue = [
        ...fieldData,
        {
          name: 'check_in',
          value: dayjs(data?.check_in, 'HH:mm:ss'),
          errors: '',
        },
        {
          name: 'check_out',
          value: dayjs(data?.check_out, 'HH:mm:ss'),
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

    const timeString = values?.hours ?? '00:00:00';
    const [hours] = timeString.split(':').map(Number);

    const postData = {
      ...values,
      check_in: values.check_in.format('HH:mm:ss'),
      check_out: values.check_out.format('HH:mm:ss'),
      hours: hours,
      _method: 'PUT',
    };

    appendToFormData(postData, formData);

    const { data, error } = await updateAttendence({
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
      title={'Edit Attendance'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <AttendanceForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
