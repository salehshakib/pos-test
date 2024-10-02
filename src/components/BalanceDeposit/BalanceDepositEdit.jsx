import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import defaultUser from '../../assets/data/defaultUserImage';
import {
  useGetBalanceDepositDetailsQuery,
  useUpdateBalanceDepositMutation,
} from '../../redux/services/accountDeposit/accountDepositApi';
import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import { getMissingUids } from '../../utilities/lib/deletedImageIds';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import BalanceDepositForm from './BalanceDepositForm';

const BalanceDepositEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetBalanceDepositDetailsQuery(
    { id },
    { skip: !id }
  );

  const [updateBalanceDeposit, { isLoading }] =
    useUpdateBalanceDepositMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      let newFieldData = fieldData;

      if (data?.attachments?.length === 0) {
        newFieldData = [
          ...fieldData,
          {
            name: 'attachment',
            value: [
              {
                url: defaultUser,
              },
            ],
            errors: '',
          },
        ];
      }

      setFields(newFieldData);
    } else {
      setFields([]);
    }
  }, [data, isEditDrawerOpen, setFields]);

  const handleUpdate = async (values) => {
    const postObj = {
      ...values,
      deposited_at: values.deposited_at.format('YYYY-MM-DD'),
      _method: 'PUT',
    };

    if (values?.attachment?.length > 0) {
      postObj.attachment = values?.attachment?.[0]?.originFileObj;
    }

    let deleteAttachmentIds = getMissingUids(fields, values, 'attachment');

    if (deleteAttachmentIds.length > 0) {
      postObj.deleteAttachmentIds = deleteAttachmentIds;
    }

    const formData = new FormData();

    appendToFormData(postObj, formData);

    const { data, error } = await updateBalanceDeposit({
      id,
      formData,
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
      title={'Edit Balance Deposit'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <BalanceDepositForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default BalanceDepositEdit;
