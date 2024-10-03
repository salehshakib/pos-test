import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetVariantsDetailsQuery,
  useUpdateVariantsMutation,
} from '../../redux/services/variant/variantApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { VariantForm } from './VariantForm';

export const VariantEdit = ({
  id,
  setId,
  subDrawer,
  isSubDrawerOpen,
  handleCloseSubDrawer,
  setDataSource,
}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [subForm] = Form.useForm();

  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetVariantsDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );
  const [updateVariants, { isLoading }] = useUpdateVariantsMutation();

  useEffect(() => {
    if (data && (isEditDrawerOpen || isSubDrawerOpen)) {
      const fieldData = fieldsToUpdate(data);

      const newFieldData = [
        ...fieldData,
        {
          name: 'options',
          value: data?.attribute_options?.map((item) => item?.name?.toString()),
          errors: '',
        },
      ];

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen, isSubDrawerOpen]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    const postObj = { ...values, _method: 'PUT' };

    if (subDrawer) {
      postObj.parent = 1;
      postObj.child = 1;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateVariants({
      id,
      data: formData,
    });

    if (data?.success) {
      if (subDrawer && isSubDrawerOpen) {
        handleCloseSubDrawer();
        setDataSource((prev) => {
          const newDatasource = prev.map((item) => {
            if (item.id.toString() === id.toString()) {
              return {
                ...item,
                options: data?.data?.attribute_options,
              };
            }
            return item;
          });

          return newDatasource;
        });
        subForm.resetFields();
      } else {
        setId(undefined);
        dispatch(closeEditDrawer());
      }
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);
      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Edit Attribute'}
      open={subDrawer ? isSubDrawerOpen : isEditDrawerOpen}
      onClose={subDrawer && handleCloseSubDrawer}
      isLoading={isFetching}
    >
      <VariantForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={subDrawer ? subForm : form}
        onClose={subDrawer && handleCloseSubDrawer}
      />
    </CustomDrawer>
  );
};
