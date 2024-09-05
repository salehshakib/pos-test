import { Button, Col, Form, Row } from 'antd';
import { useState } from 'react';
import { BsCash } from 'react-icons/bs';
import { FaCreditCard } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { IoRocketOutline } from 'react-icons/io5';
import { MdCardGiftcard } from 'react-icons/md';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomModal from '../Shared/Modal/CustomModal';
import { PaymentTypeComponent } from './overview/PaymentTypeComponent';

const Payment = ({ handleSubmit, isLoading, getGrandTotal }) => {
  const [paymentForm] = Form.useForm();

  const [paymentType, setPaymentType] = useState('Cash');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const [grandTotal, setGrandTotal] = useState(0);

  const showModal = (type) => {
    setPaymentType(type);

    setGrandTotal(getGrandTotal());

    setIsModalOpen(true);
  };

  const onSubmit = (values) => {
    const { data, formValues } = handleSubmit();

    console.log(values);
    console.log(data);
    console.log(formValues);
  };

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <div className="mx-auto grid grid-cols-3 gap-x-3 gap-y-2 lg:grid-cols-6">
          <Button
            type="primary"
            icon={<BsCash />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Cash')}
          >
            Cash
          </Button>
          <Button
            type="primary"
            icon={<FaCreditCard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Card')}
          >
            Card
          </Button>

          <Button
            type="primary"
            icon={<HiOutlineBanknotes />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Cheque')}
          >
            Cheque
          </Button>
          <Button
            type="primary"
            icon={<MdCardGiftcard />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Gift Card')}
          >
            Gift Card
          </Button>

          <Button
            type="primary"
            icon={<IoRocketOutline />}
            className="flex min-w-fit items-center justify-center"
            onClick={() => showModal('Points')}
          >
            Points
          </Button>

          <Button
            type="primary"
            icon={<GoHistory />}
            className="flex min-w-fit items-center justify-center"
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
        footer={null}
      >
        <CustomForm
          form={paymentForm}
          layout="vertical"
          autoComplete="on"
          scrollToFirstError
          handleSubmit={onSubmit}
          onClose={hideModal}
          btnStyle={false}
          isLoading={isLoading}
        >
          <Row {...rowLayout}>
            <PaymentTypeComponent
              paymentType={paymentType}
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
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default Payment;
