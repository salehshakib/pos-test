import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useGetAllCustomerQuery } from '../../redux/services/customer/customerApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomerCreate from '../Customer/CustomerCreate';
import { CashierComponent } from '../ReusableComponent/CashierComponent';
import { WarehouseComponent } from '../ReusableComponent/WarehouseComponent';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomInput from '../Shared/Input/CustomInput';
import { SearchProduct } from '../Shared/ProductControllerComponent/SearchProduct';
import { CustomSelectButton } from '../Shared/Select/CustomSelectButton';
import { CustomPosProductsComponent } from './overview/CustomPosProductsComponent';

const CustomerComponent = ({ size }) => {
  const form = Form.useFormInstance();
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllCustomerQuery({
    params,
  });

  const options = data?.results?.customer?.map((customer) => ({
    value: customer.id?.toString(),
    label: customer.name,
  }));

  useEffect(() => {
    if (options?.length && !form.getFieldValue('customer_id')) {
      form.setFieldValue('customer_id', options[0].value);
    }
  }, [form, options]);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        placeholder={'customer'}
        showSearch={true}
        isLoading={isLoading}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        required={true}
        name="customer_id"
        customStyle={true}
        size={size}
      />

      <CustomerCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};

// const CurrencyComponent = ({ size }) => {
//   const form = Form.useFormInstance();
//   const currency = useSelector(useCurrency);

//   const options = currencies.map(({ name, symbol, code }) => {
//     return { label: `${name} (${symbol})`, value: code };
//   });

//   useEffect(() => {
//     if (options?.length) {
//       form.setFieldValue('currency', currency?.name);
//     }
//   }, [currency?.name, form, options]);

//   return (
//     <CustomSelect
//       placeholder={'currency'}
//       showSearch={true}
//       options={options}
//       required={true}
//       name="currency"
//       customStyle={true}
//       size={size}
//     />
//   );
// };

// const CurrencyExchangeComponent = (size) => {
//   const form = Form.useFormInstance();

//   useEffect(() => {
//     form.setFieldValue('exchange_rate', 1);
//   }, [form]);

//   const content = (
//     <Tooltip title="Cuurency Exchange Rate">
//       <InfoCircleOutlined
//         style={{
//           color: 'rgba(0,0,0,.45)',
//         }}
//       />
//     </Tooltip>
//   );

//   return (
//     <CustomInput
//       type={'number'}
//       name={'exchange_rate'}
//       placeholder={'Exchange Rate'}
//       suffix={content}
//       customStyle={true}
//       size={size}
//     />
//   );
// };

const RegisterForm = ({ products, setProducts }) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    if (products?.length === 0) {
      const currentDate = dayjs(new Date());
      form.setFieldValue('sale_at', currentDate);
    }
  }, [form, products]);

  return (
    <GlobalUtilityStyle className="pb-5">
      <div className="flex flex-col">
        <Row gutter={5}>
          <Col span={4}>
            <CustomDatepicker
              name={'sale_at'}
              required={true}
              placeholder={'Date'}
              customStyle={true}
              size="default"
            />
          </Col>

          <Col span={20}>
            <CustomInput
              type={'text'}
              placeholder={'Reference Number'}
              name={'reference_number'}
              size="default"
              customStyle={true}
            />
          </Col>

          <Col span={8}>
            <WarehouseComponent
              label={false}
              //  size="default"
            />
          </Col>
          <Col span={8}>
            <CashierComponent
              label={false}
              required={true}
              // size="default"
            />
          </Col>

          <Col span={8}>
            <CustomerComponent
            // size="default"
            />
          </Col>

          {/* currency, exchange_rate */}
          {/* <Col span={12}>
            <Row gutter={5}>
              <Col span={14}>
                <CurrencyComponent size="default" />
              </Col>
              <Col span={10}>
                <CurrencyExchangeComponent size="default" />
              </Col>
            </Row>
          </Col> */}
          <SearchProduct products={products} setProducts={setProducts} />
        </Row>
      </div>
    </GlobalUtilityStyle>
  );
};

export const PosRegister = ({
  form,
  products,
  setProducts,
  handleGrandTotal,
  handleSubmit,
  resetRef,
}) => {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete="on"
        scrollToFirstError
        className="h-[95vh]"
        noStyle
      >
        <div className="flex h-full flex-col p-4">
          <div className="flex-none">
            <RegisterForm products={products} setProducts={setProducts} />
          </div>

          <CustomPosProductsComponent
            handleGrandTotal={handleGrandTotal}
            products={products}
            setProducts={setProducts}
            handleSubmit={handleSubmit}
            ref={resetRef}
          />
        </div>
      </Form>
    </>
  );
};
