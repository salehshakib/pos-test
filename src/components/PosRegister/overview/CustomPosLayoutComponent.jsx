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

  // const handleFormValues = () => {
  //   if (formValuesRef.current) {
  //     return formValuesRef.current();
  //   } else {
  //     return null;
  //   }
  // };

  const handleSubmit = useCallback(
    (submitFunction) => {
      const data = posForm.getFieldsValue([
        'sale_at',
        'warehouse_id',
        'cashier_id',
        'customer_id',
        'reference_number',
      ]);

      // Map field names to user-friendly labels
      const fieldNames = {
        sale_at: 'Sale Date',
        warehouse_id: 'Warehouse',
        cashier_id: 'Cashier',
        customer_id: 'Customer',
        reference_number: 'Reference Number',
      };

      // Find missing fields
      const missingFields = Object.keys(data).filter(
        (key) => data[key] === undefined || data[key] === null
      );

      // Check if any missing fields and display a message
      if (missingFields.length > 0) {
        const missingFieldsNames = missingFields
          .map((key) => fieldNames[key])
          .join(', ');

        openNotification(
          'error',
          `Please fill all the required fields. Missing: ${missingFieldsNames}.`
        );
        return;
      }

      console.log(data);

      const formValues = submitFunction();

      console.log(formValues);

      return { data, formValues };
    },
    [posForm]
  );

  //payment
  const paymentRef = useRef(null);

  const handleGrandTotal = useCallback((submitFunction) => {
    paymentRef.current = submitFunction;
  }, []);

  const updateGrandTotal = () => {
    return paymentRef.current ? parseFloat(paymentRef.current()) : 0;
  };

  return (
    <GlobalUtilityStyle>
      <div className="h-full min-h-[60vh] grow overflow-auto bg-[#F5F5F5]">
        <div className="grid h-[85vh] grid-cols-6">
          <div className="col-span-4">
            <PosRegister
              form={posForm}
              products={products}
              setProducts={setProducts}
              handleGrandTotal={handleGrandTotal}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="relative col-span-2 flex h-[90vh] flex-col">
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
        className="py-4"
      >
        <Payment handleSubmit={handleSubmit} getGrandTotal={updateGrandTotal} />
      </Footer>
    </GlobalUtilityStyle>
  );
};
