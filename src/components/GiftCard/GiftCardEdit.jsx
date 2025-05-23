import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditDrawer } from '../../redux/services/drawer/drawerSlice';
import {
  useGetGiftCardDetailsQuery,
  useUpdateGiftCardMutation,
} from '../../redux/services/giftcard/giftcard/giftCardApi';
import { errorFieldsUpdate } from '../../utilities/lib/errorFieldsUpdate';
import { fieldsToUpdate } from '../../utilities/lib/fieldsToUpdate';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import GiftCardForm from './GiftCardForm';

const GiftCardEdit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetGiftCardDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateGiftCard, { isLoading }] = useUpdateGiftCardMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    } else {
      setFields([]);
    }
  }, [data, setFields, isEditDrawerOpen]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateGiftCard({
      id,
      data: {
        ...values,
        expired_date: values?.expired_date,
        _method: 'PUT',
      },
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
      title={'Edit Gift Card'}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <GiftCardForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default GiftCardEdit;
