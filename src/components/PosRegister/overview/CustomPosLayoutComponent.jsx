import { Button, Form, Layout, Tag } from 'antd';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { GlobalUtilityStyle } from '../../../container/Styled';
import { Filter } from '../../../pages/Dashboard/PosRegister/Filter';
import { isDev, mode } from '../../../utilities/configs/base_url';
import Logo from '../../AllSection/Header/Logo';
import Profile from '../../AllSection/Header/Profile';
import Payment from '../Payment';
import { PosRegister } from '../PosRegister';
import { CustomPaymentComponent } from './CustomPaymentComponent';

const { Footer } = Layout;

export const CustomPosLayoutComponent = ({ setCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [posForm] = Form.useForm();

  const handleSubmit = (values, { formValues }) => {
    console.log({ values, formValues });
  };

  console.log(products);

  return (
    <GlobalUtilityStyle>
      <div className="h-full min-h-[60vh] grow overflow-auto bg-[#F5F5F5]">
        <div className="grid h-[85vh] grid-cols-6">
          <div className="col-span-4">
            <PosRegister
              // formValues={formValues}
              // setFormValues={setFormValues}
              form={posForm}
              products={products}
              setProducts={setProducts}
              // productUnits={productUnits}
              // setProductUnits={setProductUnits}
              // form={posForm}
              // errorFields={errorFields}
              // setGrandTotal={setGrandTotal}
              // type={type}
              // setType={setType}
            />
          </div>

          {/* sidebar button */}
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

            <Filter
              form={posForm}
              // products={products}
              setProducts={setProducts}
              // setFormValues={setFormValues}
              // setProductUnits={setProductUnits}
            />
          </div>
        </div>
      </div>

      <Footer
        style={{
          textAlign: 'center',
        }}
        className="py-4"
      >
        {/* <CustomPaymentComponent /> */}
        <Payment
        // handleSubmit={handleSubmit}
        // form={posForm}
        // fields={errorFields}
        // isLoading={isLoading}
        // isModalOpen={isModalOpen}
        // setIsModalOpen={setIsModalOpen}
        // grandTotal={grandTotal}
        />
      </Footer>
    </GlobalUtilityStyle>
  );
};
