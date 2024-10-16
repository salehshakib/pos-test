import { Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { useGetDepartmentsQuery } from '../../redux/services/hrm/department/departmentApi';
import {
  useGetHolidayDetailsQuery,
  useUpdateHolidayMutation,
} from '../../redux/services/hrm/holiday/holidayApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { HolidaysForm } from './HolidaysForm';

export const HolidaysEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data: departmentData } = useGetDepartmentsQuery({ params });

  const departmentLength = departmentData?.results?.department?.length;

  const { data, isFetching } = useGetHolidayDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const [updateHoliday, { isLoading }] = useUpdateHolidayMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const newFields = [
        ...fieldData,
        {
          name: 'all_departments',
          value: data?.holiday_departments.length === departmentLength,
          errors: '',
        },
        {
          name: 'department_ids',
          value:
            data?.holiday_departments?.map((item) => item?.id?.toString()) ??
            [],
          errors: '',
        },
      ];

      setFields(newFields);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen, departmentLength]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postObj = {
      ...values,
      _method: 'PUT',
    };

    if (values?.end_date) {
      postObj.end_date = values?.end_date;
    } else {
      postObj.end_date = dayjs(values?.end_date).format('YYYY-MM-DD');
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateHoliday({
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
      title={'Edit Holiday'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <HolidaysForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
