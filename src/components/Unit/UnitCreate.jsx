import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { useCreateUnitMutation } from '../../redux/services/unit/unitApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import UnitForm from './UnitForm';

const UnitCreate = ({
  subDrawer,
  isSubDrawerOpen,
  handleCloseSubDrawer,
  setFetchData,
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const postObj = {
      ...values,
      operator: values.operator ? values.operator : '*',
      operation_value: values.operation_value ? values.operation_value : 1,
    };

    appendToFormData(postObj, formData);

    const { data, error } = await createUnit({
      data: formData,
    });

    if (data?.success) {
      if (subDrawer && isSubDrawerOpen) {
        setFetchData(true);

        handleCloseSubDrawer();
        subForm.resetFields();
      } else {
        dispatch(closeCreateDrawer());
        form.resetFields();
      }
    }

    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,
        errors: error?.data?.errors[fieldName],
      }));
      setErrorFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Create Unit'}
      open={subDrawer ? isSubDrawerOpen : isCreateDrawerOpen}
      onClose={subDrawer && handleCloseSubDrawer}
    >
      <UnitForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={subDrawer ? subForm : form}
        onClose={subDrawer && handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};

export default UnitCreate;
