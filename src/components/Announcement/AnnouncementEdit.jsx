import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetAnnouncementDetailsQuery,
  useUpdateAnnouncementMutation,
} from '../../redux/services/hrm/announcement/announcementApi';
import { useGetDepartmentsQuery } from '../../redux/services/hrm/department/departmentApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { AnnouncementForm } from './AnnouncementForm';

export const AnnouncementEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data: departmentData } = useGetDepartmentsQuery({ params });

  const departmentLength = departmentData?.results?.department?.length;

  const { data, isFetching } = useGetAnnouncementDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const [updateLeaveType, { isLoading }] = useUpdateAnnouncementMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldData = [
        ...fieldData,
        {
          name: 'all_departments',
          value: data?.announcement_departments?.length === departmentLength,
          errors: '',
        },
        {
          name: 'department_ids',
          value: data?.announcement_departments?.map((item) =>
            item?.id?.toString()
          ),
          errors: '',
        },
      ];

      setFields(updateFieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen, departmentLength]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postData = {
      ...values,
      is_send_email: values?.is_send_email ? '1' : '0',
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
      title={'Edit Annoucement'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <AnnouncementForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
