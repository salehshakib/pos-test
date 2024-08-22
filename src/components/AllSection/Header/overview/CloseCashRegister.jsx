import { Button, Modal, theme, Tooltip } from 'antd';
import { useState } from 'react';
import { FaCashRegister } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalUtilityStyle } from '../../../../container/Styled';
import { useCurrentUser } from '../../../../redux/services/auth/authSlice';
import { useUpdatePettyCashMutation } from '../../../../redux/services/pettycash/pettyCashApi';
import { clearPettyCash } from '../../../../redux/services/pettycash/pettyCashSlice';

export const CloseCashRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = theme.useToken();
  const { pathname } = location;

  const [updatePettyCash, { isLoading }] = useUpdatePettyCashMutation();

  const [open, setOpen] = useState(false);

  const { pettyCashId } = useSelector((state) => state.pettyCash);

  const handleCashRegister = () => {
    if (pathname.includes('/pos')) {
      setOpen(true);
      return;
    }

    navigate('/petty-cash');
  };

  const user = useSelector(useCurrentUser);

  const closeCashRegister = async () => {
    const { data } = await updatePettyCash({
      id: pettyCashId,
      data: {
        warehouse_id: user?.warehouse_id,
        status: 'Close',
        _method: 'PUT',
      },
    });

    if (data?.success) {
      dispatch(clearPettyCash());

      hideModal();
      navigate('/dashboard');
    }
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleCashRegister}
        className="flex justify-center items-center"
      >
        <Tooltip title="Petty Cash">
          <FaCashRegister
            size={16}
            style={{
              color: token.colorPrimary,
            }}
            className="hover:cursor-pointer hover:shadow-lg"
          />
        </Tooltip>
      </Button>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <RiErrorWarningFill
              style={{
                color: 'red',
                fontSize: '20px',
              }}
            />
            <span>Close Cash Register</span>
          </div>
        }
        width={600}
        centered
        open={open}
        onCancel={hideModal}
        footer={null}
      >
        <GlobalUtilityStyle>
          <span className="text-[16px]">
            {' '}
            Are you sure you want to close cash register?
          </span>
          <div className={`w-full flex gap-3 justify-end items-center pt-5`}>
            <Button
              htmlType="button"
              onClick={closeCashRegister}
              type="primary"
              loading={isLoading}
            >
              Close
            </Button>
          </div>
        </GlobalUtilityStyle>
      </Modal>
    </>
  );
};
