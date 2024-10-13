// import { Col, Form, Row } from 'antd';
// import dayjs from 'dayjs';
// import { useEffect, useState } from 'react';
// import { FaPlus } from 'react-icons/fa';

// import { GlobalUtilityStyle } from '../../container/Styled';
// import { useGetAllCustomerQuery } from '../../redux/services/customer/customerApi';
// import {
//   DEFAULT_SELECT_VALUES,
//   useGlobalParams,
// } from '../../utilities/hooks/useParams';
// import CustomerCreate from '../Customer/CustomerCreate';
// import { CashierComponent } from '../ReusableComponent/CashierComponent';
// import { WarehouseComponent } from '../ReusableComponent/WarehouseComponent';
// import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
// import CustomInput from '../Shared/Input/CustomInput';
// import { SearchProduct } from '../Shared/ProductControllerComponent/SearchProduct';
// import { CustomSelectButton } from '../Shared/Select/CustomSelectButton';
// import { CustomPosProductsComponent } from './overview/CustomPosProductsComponent';

// const CustomerComponent = ({ size }) => {
//   const form = Form.useFormInstance();
//   const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

//   const params = useGlobalParams({
//     selectValue: DEFAULT_SELECT_VALUES,
//   });

//   const { data, isLoading } = useGetAllCustomerQuery({
//     params,
//   });

//   const options = data?.results?.customer?.map((customer) => ({
//     value: customer.id?.toString(),
//     label: customer.name,
//   }));

//   useEffect(() => {
//     if (options?.length && !form.getFieldValue('customer_id')) {
//       form.setFieldValue('customer_id', options[0].value);
//     }
//   }, [form, options]);

//   const handleOpenSubDrawer = () => {
//     setIsSubDrawerOpen(true);
//   };

//   const handleCloseSubDrawer = () => {
//     setIsSubDrawerOpen(false);
//   };

//   return (
//     <>
//       <CustomSelectButton
//         placeholder={'customer'}
//         showSearch={true}
//         isLoading={isLoading}
//         options={options}
//         icon={<FaPlus className="text-xl" />}
//         onClick={handleOpenSubDrawer}
//         required={true}
//         name="customer_id"
//         customStyle={true}
//         size={size}
//       />

//       <CustomerCreate
//         subDrawer={true}
//         isSubDrawerOpen={isSubDrawerOpen}
//         handleCloseSubDrawer={handleCloseSubDrawer}
//       />
//     </>
//   );
// };

// // const CurrencyComponent = ({ size }) => {
// //   const form = Form.useFormInstance();
// //   const currency = useSelector(useCurrency);

// //   const options = currencies.map(({ name, symbol, code }) => {
// //     return { label: `${name} (${symbol})`, value: code };
// //   });

// //   useEffect(() => {
// //     if (options?.length) {
// //       form.setFieldValue('currency', currency?.name);
// //     }
// //   }, [currency?.name, form, options]);

// //   return (
// //     <CustomSelect
// //       placeholder={'currency'}
// //       showSearch={true}
// //       options={options}
// //       required={true}
// //       name="currency"
// //       customStyle={true}
// //       size={size}
// //     />
// //   );
// // };

// // const CurrencyExchangeComponent = (size) => {
// //   const form = Form.useFormInstance();

// //   useEffect(() => {
// //     form.setFieldValue('exchange_rate', 1);
// //   }, [form]);

// //   const content = (
// //     <Tooltip title="Cuurency Exchange Rate">
// //       <InfoCircleOutlined
// //         style={{
// //           color: 'rgba(0,0,0,.45)',
// //         }}
// //       />
// //     </Tooltip>
// //   );

// //   return (
// //     <CustomInput
// //       type={'number'}
// //       name={'exchange_rate'}
// //       placeholder={'Exchange Rate'}
// //       suffix={content}
// //       customStyle={true}
// //       size={size}
// //     />
// //   );
// // };

// // const RegisterForm = ({ products, setProducts }) => {
// //   const form = Form.useFormInstance();

// //   useEffect(() => {
// //     if (products?.length === 0) {
// //       const currentDate = dayjs(new Date());
// //       form.setFieldValue('sale_at', currentDate);
// //     }
// //   }, [form, products]);

// //   return (

// //   );
// // };

// // export const PosRegister = ({
// //   form,
// //   products,
// //   setProducts,
// //   handleGrandTotal,
// //   handleSubmit,
// //   resetRef,
// // }) => {
// //   return (
// //     <>

// //     </>
// //   );
// // };
