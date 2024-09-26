import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetLeaveDetailsQuery,
  useUpdateLeaveMutation,
} from '../../redux/services/hrm/leave/leaveApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { LeaveForm } from './LeaveForm';

export const LeaveEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetLeaveDetailsQuery({ id }, { skip: !id });

  const [updateLeave, { isLoading }] = useUpdateLeaveMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      // const newFieldData = [
      //   ...fieldData,
      //   {
      //     name: 'leave_start_time',
      //     value: dayjs(data?.leave_start_date, 'hh:mm:ss'),
      //     errors: '',
      //   },
      //   {
      //     name: 'leave_end_time',
      //     value: dayjs(data?.leave_end_time, 'hh:mm:ss'),
      //     errors: '',
      //   },
      // ];

      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      leave_end_date:
        values?.leave_duration === 'half-day' ||
        values?.leave_duration === 'single-day'
          ? values?.leave_start_date
          : values?.leave_end_date,
      is_send_email: values?.is_send_email == true ? '1' : '0',
      _method: 'PUT',
    };

    if (values?.attachment?.length > 0) {
      postData.attachment = values?.attachment?.[0]?.originFileObj;
    }

    if (values?.leave_start_time) {
      postData.leave_start_time = dayjs(values?.leave_start_time).format(
        'HH:mm:ss'
      );
    }
    if (values?.leave_end_time) {
      postData.leave_end_time = dayjs(values?.leave_end_time).format(
        'HH:mm:ss'
      );
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds?.length > 0) {
      postData.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postData, formData);

    const { data, error } = await updateLeave({
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
      title={'Edit Leave'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <LeaveForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
