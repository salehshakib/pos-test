import { Button, Form, Layout, Tag } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { Filter } from '../../../pages/Dashboard/PosRegister/Filter';
import { isDev, mode } from '../../../utilities/configs/base_url';
import { openNotification } from '../../../utilities/lib/openToaster';
import Logo from '../../AllSection/Header/Logo';
import Profile from '../../AllSection/Header/Profile';
import Payment from '../Payment';
import { PosRegister } from '../PosRegister';

const { Footer } = Layout;

export const CustomPosLayoutComponent = ({ setCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [posForm] = Form.useForm();

  const formValuesRef = useRef(null);

  const handleSubmit = useCallback((submitFunction) => {
    formValuesRef.current = submitFunction;
  }, []);

  const handleFormValues = () => {
    if (formValuesRef.current) {
      const data = posForm.getFieldsValue([
        'sale_at',
        'warehouse_id',
        'cashier_id',
        'customer_id',
        'reference_number',
        'currency',
        'exchange_rate',
      ]);

      const fieldNames = {
        sale_at: 'Sale Date',
        warehouse_id: 'Warehouse',
        cashier_id: 'Cashier',
        customer_id: 'Customer',
        currency: 'Currency',
        exchange_rate: 'Exchange Rate',
      };

      const missingFields = Object.keys(data).filter(
        (key) =>
          key !== 'reference_number' &&
          (data[key] === undefined || data[key] === null)
      );

      if (missingFields.length > 0) {
        const missingFieldsNames = missingFields
          .map((key) => fieldNames[key])
          .join(', ');

        openNotification('error', `Missing: ${missingFieldsNames}.`);
        return;
      }

      const formValues = formValuesRef.current();

      return { data, formValues };
    } else {
      return null;
    }
  };

  //payment
  const paymentRef = useRef(null);

  const handleGrandTotal = useCallback((submitFunction) => {
    paymentRef.current = submitFunction;
  }, []);

  const updateGrandTotal = () => {
    if (products.length === 0) {
      openNotification('error', 'Please add at least one products.');
      return null;
    }

    return paymentRef.current ? parseFloat(paymentRef.current()) : 0;
  };

  const resetRef = useRef(null);

  const triggerReset = () => {
    return resetRef.current ? resetRef.current.resetFields() : null;
  };

  return (
    <GlobalUtilityStyle className="lg:relative h-full">
      <div className="grow overflow-auto bg-[#F5F5F5]">
        <div className="lg:grid h-[95vh] grid-cols-6">
          <div className="col-span-4">
            <PosRegister
              form={posForm}
              products={products}
              setProducts={setProducts}
              handleGrandTotal={handleGrandTotal}
              handleSubmit={handleSubmit}
              resetRef={resetRef}
            />
          </div>

          <div className="lg:relative col-span-2 flex h-[95vh] flex-col overflow-y-auto overflow-x-hidden">
            <div className="top-0 z-50 flex w-full items-center justify-between bg-white px-5 shadow-md">
              <div className="flex items-center gap-6 text-2xl">
                <Button
                  className="flex items-center justify-center rounded-full border border-none p-0 text-[20px]"
                  type="text"
                  icon={<GiHamburgerMenu />}
                  onClick={() => setCollapsed((prev) => !prev)}
                />

                <Logo />
              </div>
              <div>
                {mode === 'local' && (
                  <Tag color="processing" className="font-semibold">
                    {mode.toUpperCase()} MODE
                  </Tag>
                )}

                {isDev.toLowerCase() === 'true' && (
                  <Tag color="purple" className="font-semibold">
                    DEV MODE
                  </Tag>
                )}
              </div>
              <Profile />
            </div>

            <Filter form={posForm} setProducts={setProducts} />
          </div>
        </div>
      </div>

      <Footer
        style={{
          textAlign: 'center',
        }}
        className="absolute bottom-0 z-50 w-full py-2 bg-white"
      >
        <Payment
          handleSubmit={handleFormValues}
          getGrandTotal={updateGrandTotal}
          handleReset={triggerReset}
        />
      </Footer>
    </GlobalUtilityStyle>
  );
};
