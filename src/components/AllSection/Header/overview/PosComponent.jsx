import { Button, Col, Form, Modal, Row, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { MdPointOfSale } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GlobalUtilityStyle } from '../../../../container/Styled';
import { fullColLayout, rowLayout } from '../../../../layout/FormLayout';
import { useCurrentUser } from '../../../../redux/services/auth/authSlice';
import {
  useCheckPettyCashQuery,
  useCreatePettyCashMutation,
  useUpdatePettyCashMutation,
} from '../../../../redux/services/pettycash/pettyCashApi';
import {
  clearPettyCash,
  setPettyCash,
} from '../../../../redux/services/pettycash/pettyCashSlice';
import CustomInput from '../../../Shared/Input/CustomInput';

const PettyCashOpenComponent = ({ navigate, open, setOpen }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);

  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const [createPettyCash, { isLoading }] = useCreatePettyCashMutation();

  const [updatePettyCash, { isLoading: isUpdating }] =
    useUpdatePettyCashMutation();

  const user = useSelector(useCurrentUser);

  const handleSubmit = async (values) => {
    if (pettyCashId) {
      const { data, error } = await updatePettyCash({
        id: pettyCashId,
        data: {
          warehouse_id: user?.warehouse_id,
          status: 'Open',
          _method: 'PUT',
        },
      });

      if (data?.success) {
        dispatch(setPettyCash({ status: 'Open', id: data?.data?.id }));
        hideModal();
        form.resetFields();
        navigate('/pos');
      }

      if (error) {
        const errorFields = Object.keys(error?.data?.errors).map(
          (fieldName) => ({
            name: fieldName,
            errors: error?.data?.errors[fieldName],
          })
        );
        setErrorFields(errorFields);
      }
    } else {
      const { data, error } = await createPettyCash({
        data: { ...values, warehouse_id: user?.warehouse_id, status: 'Open' },
      });

      if (data?.success) {
        dispatch(setPettyCash({ status: 'Open', id: data?.data?.id }));
        hideModal();
        form.resetFields();
        navigate('/pos');
      }

      if (error) {
        const errorFields = Object.keys(error?.data?.errors).map(
          (fieldName) => ({
            name: fieldName,
            errors: error?.data?.errors[fieldName],
          })
        );
        setErrorFields(errorFields);
      }
    }
  };

  const hideModal = () => {
    setOpen(false);
    form.resetFields();
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      width={600}
      centered
      title={'Cash Register Open'}
      open={open}
      onCancel={hideModal}
      footer={null}
    >
      <Form
        fields={errorFields}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Row {...rowLayout} className="mt-5">
          <Col {...fullColLayout}>
            <CustomInput
              label="Opening Balance"
              type="number"
              name="opening_balance"
              required={true}
            />
          </Col>
        </Row>
        <div className={`flex w-full items-center justify-end gap-3 pt-5`}>
          <Button type="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading || isUpdating}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export const PosComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pettyCash } = useSelector((state) => state.pettyCash);
  const user = useSelector(useCurrentUser);

  const { data: pettyCashData } = useCheckPettyCashQuery(
    {
      params: {
        warehouse_id: parseInt(user?.warehouse_id),
      },
    },
    {
      skip: !user?.warehouse_id,
    }
  );

  useEffect(() => {
    if (pettyCashData?.data) {
      if (pettyCashData?.data?.status === 'Open') {
        dispatch(setPettyCash({ status: 'Open', id: pettyCashData?.data?.id }));
      } else if (
        pettyCashData?.data?.status === 'Close' &&
        !pettyCashData?.data?.id
      ) {
        dispatch(setPettyCash({ status: 'Close', id: undefined }));
      } else {
        dispatch(clearPettyCash());
      }
    } else {
      dispatch(clearPettyCash());
    }
  }, [pettyCashData?.data, dispatch, pettyCash?.data?.status]);

  const [open, setOpen] = useState(false);

  const posRegister = () => {
    if (pettyCash === 'Close') {
      setOpen(true);
    } else navigate('/pos');
  };

  return (
    <GlobalUtilityStyle>
      <Tooltip title="POS">
        <Button
          icon={<MdPointOfSale size={18} />}
          className="flex items-center justify-center gap-1 shadow-sm"
          onClick={posRegister}
        >
          POS
        </Button>
      </Tooltip>

      <PettyCashOpenComponent
        navigate={navigate}
        open={open}
        setOpen={setOpen}
      />
    </GlobalUtilityStyle>
  );
};
