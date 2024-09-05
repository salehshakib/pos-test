import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Form, Row, Tooltip } from 'antd';
import { currencies } from 'currencies.json';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useGetAllCustomerQuery } from '../../redux/services/customer/customerApi';
import { useCurrency } from '../../redux/services/pos/posSlice';
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
import CustomSelect from '../Shared/Select/CustomSelect';
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

const CurrencyComponent = ({ size }) => {
  const form = Form.useFormInstance();
  const currency = useSelector(useCurrency);

  const options = currencies.map(({ name, symbol, code }) => {
    return { label: `${name} (${symbol})`, value: code };
  });

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue('currency', currency?.name);
    }
  }, [currency?.name, form, options]);

  return (
    <CustomSelect
      placeholder={'currency'}
      showSearch={true}
      options={options}
      required={true}
      name="currency"
      customStyle={true}
      size={size}
    />
  );
};

const CurrencyExchangeComponent = (size) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('exchange_rate', 1);
  }, [form]);

  const content = (
    <Tooltip title="Cuurency Exchange Rate">
      <InfoCircleOutlined
        style={{
          color: 'rgba(0,0,0,.45)',
        }}
      />
    </Tooltip>
  );

  return (
    <CustomInput
      type={'number'}
      name={'exchange_rate'}
      placeholder={'Exchange Rate'}
      suffix={content}
      customStyle={true}
      size={size}
    />
  );
};

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

          <Col span={6}>
            <WarehouseComponent label={false} size="default" />
          </Col>
          <Col span={6}>
            <CashierComponent label={false} required={true} size="default" />
          </Col>

          <Col span={8}>
            <CustomerComponent size="default" />
          </Col>

          <Col span={12}>
            <CustomInput
              type={'text'}
              placeholder={'Reference Number'}
              name={'reference_number'}
              size="default"
              customStyle={true}
            />
          </Col>
          <Col span={12}>
            <Row gutter={5}>
              <Col span={14}>
                <CurrencyComponent size="default" />
              </Col>
              <Col span={10}>
                <CurrencyExchangeComponent size="default" />
              </Col>
            </Row>
          </Col>
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
}) => {
  // const [totalQuantity, setTotalQuantity] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   const total = Object.values(formValues.product_list.qty).reduce(
  //     (acc, cur) => acc + parseInt(cur),
  //     0
  //   );
  //   setTotalQuantity(total);

  //   const totalPrice = Object.values(formValues.product_list.total).reduce(
  //     (acc, cur) => acc + parseFloat(cur),
  //     0
  //   );
  //   setTotalPrice(totalPrice?.toFixed(2));
  // }, [formValues, products]);

  // const [discount, setDiscount] = useState(0);
  // const [shipping, setShipping] = useState(0);
  // const [coupon, setCoupon] = useState(0);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalType, setModalType] = useState(null);

  // const showModal = (value) => {
  //   setIsModalOpen(true);
  //   setModalType(value);
  // };
  // const hideModal = () => {
  //   setIsModalOpen(false);
  //   setModalType(null);
  // };

  // const taxRate = Form.useWatch('tax_rate', form);

  // const handleSubmit = async () => {
  //   if (modalType === 'Discount') {
  //     setDiscount(form.getFieldValue(modalType));
  //   }

  //   if (modalType === 'Shipping Cost') {
  //     setShipping(form.getFieldValue(modalType));
  //   }

  //   if (modalType === 'Coupon') {
  //     if (totalPrice < productUnits.minimum_amount) {

  //       openNotification(
  //         'info',
  //         'Coupon can be applied only if total price is greater than ' +
  //           productUnits.minimum_amount
  //       );

  //       // hideModal();
  //       return;
  //     }

  //     if (type?.toLowerCase() === 'fixed') {
  //       setCoupon(productUnits.coupon_rate);
  //     }
  //   }

  //   hideModal();
  // };

  // const tax = (totalPrice * (taxRate ?? 0)) / 100;

  // const grand_total =
  //   parseFloat(totalPrice) +
  //   parseFloat(tax ?? 0) +
  //   parseFloat(shipping) -
  //   parseFloat(discount) -
  //   parseFloat(coupon);

  // useEffect(() => {
  //   setGrandTotal(grand_total);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [grand_total, setGrandTotal, totalPrice]);

  // const currency = useSelector(useCurrency);

  // useEffect(() => {
  //   if (type?.toLowerCase() === 'fixed') {
  //     setCoupon(productUnits.coupon_rate);
  //   }
  // }, [type, productUnits.coupon_rate, totalPrice, productUnits.minimum_amount]);

  // const handleSubmit = (values, { formValues }) => {
  //   console.log({ values, formValues });
  // };

  // console.log(products);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete="on"
        scrollToFirstError
        className="h-[90vh]"
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
          />
        </div>
      </Form>
    </>
  );
};
