import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { company_code } from '../../assets/data/companyCode';
import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetEmployeeDetailsQuery,
  useUpdateEmployeeMutation,
} from '../../redux/services/hrm/employee/employeeApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import {
  fieldsToUpdate,
  updateFieldValues,
} from '../../utilities/lib/fieldsToUpdate';
import { staffIdGenerator } from '../../utilities/lib/staffIdGenerator';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import EmployeeForm from './EmployeeForm';

const EmployeeEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetEmployeeDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      const updateFieldValue = [
        {
          name: 'staff_id',
          value: data?.staff_id.slice(8),
          errors: '',
        },
      ];

      const newFieldData = updateFieldValues(fieldData, updateFieldValue);

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields]);

  const handleUpdate = async (values) => {
    const { profile_picture, nid_front, nid_back, joining_doc, cv } =
      values ?? {};

    const formData = new FormData();

    const postObj = {
      ...values,
      join_date: values?.join_date,
      have_access: values?.have_access == true ? '1' : '0',
      staff_id: staffIdGenerator(
        company_code,
        values?.join_date,
        values?.staff_id
      ),
      _method: 'PUT',
    };

    if (profile_picture?.length > 0) {
      postObj.profile_picture = profile_picture?.[0]?.originFileObj;
    }

    if (nid_front?.length > 0) {
      postObj.nid_front = nid_front?.[0]?.originFileObj;
    }
    if (nid_back?.length > 0) {
      postObj.nid_back = nid_back?.[0]?.originFileObj;
    }
    if (joining_doc?.length > 0) {
      postObj.joining_doc = joining_doc?.[0]?.originFileObj;
    }
    if (cv?.length > 0) {
      postObj.cv = cv?.[0]?.originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds?.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateEmployee({
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
      title={'Edit Employee'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <EmployeeForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default EmployeeEdit;
