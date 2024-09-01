import { Button, Col, Form, Row } from 'antd';
import { useState } from 'react';
import { BsCash } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { IoRocketOutline } from 'react-icons/io5';
import { MdCardGiftcard } from 'react-icons/md';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import { openNotification } from '../../utilities/lib/openToaster';
import CustomInput from '../Shared/Input/CustomInput';
import CustomModal from '../Shared/Modal/CustomModal';
import { PaymentTypeComponent } from './overview/PaymentTypeComponent';

const Payment = ({
  handleSubmit,
  form,
  isModalOpen,
  setIsModalOpen,
  isLoading,
  grandTotal,
}) => {
  const [paymentType, setPaymentType] = useState('Card');

  const handleOpenModal = (value) => {
    // sale_at, warehouse_id, cashier_id, customer_id, reference_number
    const data = form.getFieldsValue([
      'sale_at',
      'warehouse_id',
      'cashier_id',
      'customer_id',
      'reference_number',
    ]);

    const hasUndefinedOrNull = Object.values(data).some(
      (value) => value === undefined || value === null
    );

    if (hasUndefinedOrNull) {
      openNotification(
        'error',
        'Please fill all the required fields. Some values are missing.'
      );
      return false;
    }

    setPaymentType(value);
    setIsModalOpen(true);
  };

  const hideModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto grid grid-cols-3 gap-x-3 gap-y-2 lg:grid-cols-6">
          <Button
            type="primary"
            icon={<BsCash />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => handleOpenModal('Cash')}
          >
            Cash
          </Button>
          <Button
            type="primary"
            icon={<FaCreditCard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => handleOpenModal('Card')}
          >
            Card
          </Button>

          <Button
            type="primary"
            icon={<HiOutlineBanknotes />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => handleOpenModal('Cheque')}
          >
            Cheque
          </Button>
          <Button
            type="primary"
            icon={<MdCardGiftcard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => handleOpenModal('Gift Card')}
          >
            Gift Card
          </Button>

          <Button
            type="primary"
            icon={<IoRocketOutline />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => handleOpenModal('Points')}
          >
            Points
          </Button>

          <Button
            type="primary"
            icon={<GoHistory />}
            className="flex min-w-fit items-center justify-center"
            //  onClick={() => handleOpenModal("Card")}
          >
            Transactions
          </Button>
        </div>
      </div>

      <CustomModal
        title={'Finalize Sale'}
        openModal={isModalOpen}
        hideModal={hideModal}
        showCloseButton={false}
        width={800}
        footer={true}
        onOk={handleSubmit}
        loading={isLoading}
      >
        <Form layout="vertical" form={form}>
          <Row {...rowLayout}>
            <PaymentTypeComponent
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              grandTotal={grandTotal}
            />

            <Col {...mdColLayout}>
              <CustomInput
                type={'textarea'}
                name="sale_note"
                label="Sale Note"
              />
            </Col>
            <Col {...mdColLayout}>
              <CustomInput
                type={'textarea'}
                name="staff_note"
                label="Staff Note"
              />
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
};

export default Payment;
