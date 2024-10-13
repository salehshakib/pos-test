import { Button, Col, Form, Layout, Row, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit, FaMinus, FaPlus, FaRegEdit } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { GlobalUtilityStyle } from '../../../container/Styled';
import {
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../../layout/FormLayout';
import { Filter } from '../../../pages/Dashboard/PosRegister/Filter';
import { useGetAllCouponQuery } from '../../../redux/services/coupon/couponApi';
import { useGetAllCustomerQuery } from '../../../redux/services/customer/customerApi';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAllTaxQuery } from '../../../redux/services/tax/taxApi';
import { mode } from '../../../utilities/configs/base_url';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { showCurrency } from '../../../utilities/lib/currency';
import { calculateSummary } from '../../../utilities/lib/generator/generatorUtils';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import { openNotification } from '../../../utilities/lib/openToaster';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../../utilities/lib/updateFormValues/updateFormValues';
import Logo from '../../AllSection/Header/Logo';
import Profile from '../../AllSection/Header/Profile';
import CustomerCreate from '../../Customer/CustomerCreate';
import { CashierComponent } from '../../ReusableComponent/CashierComponent';
import { ProductFormComponent } from '../../ReusableComponent/ProductDetailsUpdateForm';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import CustomDatepicker from '../../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import CustomModal from '../../Shared/Modal/CustomModal';
import { SearchProduct } from '../../Shared/ProductControllerComponent/SearchProduct';
import CustomSelect from '../../Shared/Select/CustomSelect';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';
import CustomProductTable from '../../Shared/Table/CustomProductTable';
import Payment from '../Payment';

const { Footer } = Layout;

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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
    align: 'left',
    render: (name, record) => (
      <div
        className={`flex items-center gap-2 ${
          name !== 'Total' && 'hover:cursor-pointer hover:underline'
        }`}
        onClick={() => {
          record?.handleProductEdit(record?.id, record?.name);
        }}
      >
        <span className="text-dark   text-xs font-medium md:text-sm">
          {name}
        </span>
        {name !== 'Total' && <FaEdit className="primary-text" />}
      </div>
    ),
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    align: 'center',
    width: 150,
    render: (sku) => (
      <span className="text-dark   text-xs font-medium md:text-sm">{sku}</span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 60,
    render: (stock) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {stock ?? 0}
      </span>
    ),
  },
  {
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    align: 'center',
    width: 100,
    render: (unitCost) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {unitCost ?? 0}
      </span>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 180,
    render: (quantity, record) => {
      return quantity > -1 ? (
        <span className="text-dark   text-xs font-medium md:text-sm">
          {quantity}
        </span>
      ) : (
        <div className="flex items-center justify-center gap-1">
          <div>
            <Button
              key={'sub'}
              icon={<FaMinus />}
              type="primary"
              onClick={() =>
                record.decrementCounter(record?.id, record.setFormValues)
              }
            />
          </div>
          <CustomQuantityInput
            // name={["product_list", "qty", record?.id]}
            noStyle={true}
            onChange={(value) =>
              record.onQuantityChange(
                record.id,
                value,
                record.setFormValues,
                record.stock
              )
            }
            value={record?.formValues?.product_list?.qty[record?.id] || 0}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(
                  record?.id,
                  record.setFormValues,
                  record.stock
                )
              }
              className=""
            />
          </div>
        </div>
      );
    },
  },
  {
    title: 'Sub Total',
    dataIndex: 'subTotal',
    key: 'subTotal',
    align: 'center',
    width: 130,
    render: (subTotal) => (
      <span className="text-dark   text-xs font-medium md:text-sm">
        {subTotal}
      </span>
    ),
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    align: 'center',
    width: 50,
    fixed: 'right',
    render: (props, record) => {
      return (
        props && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() =>
                record.onDelete(
                  record.id,
                  record.setProducts,
                  record.setFormValues
                )
              }
              className="primary-bg rounded-xl p-1 text-white duration-300 hover:scale-110"
              type="button"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

const TaxComponent = ({ setUpdatedFormValues }) => {
  const params = useGlobalParams({
    selectValue: [...DEFAULT_SELECT_VALUES, 'rate'],
  });

  const { data, isFetching } = useGetAllTaxQuery({
    params,
  });

  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
      rate: item.rate,
    };
  });

  const onSelect = (value, option) => {
    setUpdatedFormValues((prevValues) => {
      return {
        ...prevValues,
        tax_id: value,
        tax_rate: option.rate,
      };
    });
  };

  return (
    <CustomSelect
      options={options}
      name={'tax_id'}
      isLoading={isFetching}
      placeholder={'Vat'}
      onSelect={onSelect}
    />
  );
};

const CouponComponent = ({ setUpdatedFormValues }) => {
  const params = useGlobalParams({});

  const { data, isFetching } = useGetAllCouponQuery({ params });

  const options = data?.results?.coupon
    ?.filter((item) => new Date(item.expired_date) > new Date())
    .map((item) => {
      return {
        value: item.id?.toString(),
        label: item.code,
        type: item.type,
        rate: item.amount,
        minimum_amount: item.minimum_amount,
      };
    });

  const onSelect = (value, option) => {
    setUpdatedFormValues((prevValues) => {
      return {
        ...prevValues,
        coupon_id: value,
        coupon_type: option.type,
        coupon_rate: option.rate,
        minimum_amount: option.minimum_amount,
      };
    });
  };

  return (
    <CustomSelect
      options={options}
      name={'coupon_id'}
      isLoading={isFetching}
      placeholder={'Coupon'}
      onSelect={onSelect}
      showSearch={true}
    />
  );
};

const ModalComponent = ({
  title,
  modalType,
  formValues,
  setFormValues,
  totalPrice,
  additionalForm,
  onDisountTypeChange,
}) => {
  const currency = useSelector(useCurrency);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const showModal = () => setIsModalOpen(true);

  const [updatedFormValues, setUpdatedFormValues] = useState({
    tax_id: undefined,
    tax_rate: undefined,
    coupon_id: undefined,
    coupon_type: undefined,
    coupon_rate: undefined,
    minimum_amount: undefined,
  });

  const handleSubmit = (values) => {
    switch (modalType) {
      case 'discount':
        if (values.discount) {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                discount: values.discount,
              },
            };
          });

          additionalForm.setFieldsValue({
            discount: values.discount,
          });
        } else {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                discount: 0,
              },
            };
          });

          additionalForm.setFieldsValue({
            discount: 0,
          });
        }

        break;

      case 'coupon':
        if (values.coupon_id) {
          if (
            updatedFormValues.minimum_amount &&
            Number(updatedFormValues.minimum_amount) >= Number(totalPrice)
          ) {
            openNotification(
              'error',
              'Coupon cannot be applied. Minimum amount is' +
                ' ' +
                updatedFormValues.minimum_amount
            );

            setUpdatedFormValues((prevValues) => {
              return {
                ...prevValues,
                coupon_id: undefined,
                coupon_type: undefined,
                coupon_rate: undefined,
                minimum_amount: undefined,
              };
            });

            additionalForm.setFieldsValue({
              coupon_id: undefined,
            });
            return;
          }

          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                coupon: {
                  ...prev.order.coupon,
                  coupon_id: updatedFormValues.coupon_id,
                  type: updatedFormValues.coupon_type,
                  rate: updatedFormValues.coupon_rate,
                  minimum_amount: updatedFormValues.minimum_amount,
                },
              },
            };
          });
          additionalForm.setFieldsValue({
            coupon_id: updatedFormValues.coupon_id,
          });
        } else {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                coupon: {
                  ...prev.order.coupon,
                  coupon_id: undefined,
                  type: undefined,
                  rate: undefined,
                  minimum_amount: undefined,
                },
              },
            };
          });
          additionalForm.setFieldsValue({
            coupon_id: undefined,
          });
        }

        break;

      case 'tax':
        if (values.tax_id) {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                tax_rate: updatedFormValues.tax_rate,
              },
            };
          });

          additionalForm.setFieldsValue({
            tax_id: values.tax_id,
          });
        } else {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                tax_rate: 0,
              },
            };
          });

          additionalForm.setFieldsValue({
            tax_id: undefined,
          });
        }

        break;

      case 'shipping_cost':
        if (values.shipping_cost) {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                shipping_cost: values.shipping_cost,
              },
            };
          });

          additionalForm.setFieldsValue({
            shipping_cost: values.shipping_cost,
          });
        } else {
          setFormValues((prev) => {
            return {
              ...prev,
              order: {
                ...prev.order,
                shipping_cost: 0,
              },
            };
          });

          additionalForm.setFieldsValue({
            shipping_cost: 0,
          });
        }

        break;
    }
    hideModal();
  };

  return (
    <span>
      <span
        className="flex items-center justify-start gap-2 hover:cursor-pointer hover:underline"
        onClick={showModal}
      >
        {title}
        <FaRegEdit className="primary-text" />
      </span>

      <CustomModal
        openModal={isModalOpen}
        hideModal={hideModal}
        title={title}
        width={600}
        showCloseButton={false}
        footer={null}
      >
        <CustomForm
          form={additionalForm}
          layout="vertical"
          autoComplete="on"
          scrollToFirstError
          handleSubmit={handleSubmit}
          onClose={hideModal}
          btnStyle={false}
        >
          <Row>
            <Col {...fullColLayout}>
              {modalType === 'tax' ? (
                <TaxComponent setUpdatedFormValues={setUpdatedFormValues} />
              ) : modalType === 'coupon' ? (
                <CouponComponent setUpdatedFormValues={setUpdatedFormValues} />
              ) : modalType === 'discount' ? (
                <Row {...rowLayout}>
                  <Col {...mdColLayout}>
                    <CustomSelect
                      name={'discount_type'}
                      placeholder={'Discount Type'}
                      options={[
                        {
                          value: 'Fixed',
                          label: 'Fixed',
                        },
                        {
                          value: 'Percentage',
                          label: 'Percentage',
                        },
                      ]}
                      // value={discountType}
                      onChange={onDisountTypeChange}
                    />
                  </Col>
                  <Col {...mdColLayout}>
                    <CustomInput
                      type="number_with_money"
                      name={'discount'}
                      placeholder={modalType}
                      suffix={
                        formValues.order.discount_type === 'Fixed'
                          ? currency?.name
                          : '%'
                      }
                      min={0}
                    />
                  </Col>
                </Row>
              ) : (
                <CustomInput
                  type="number_with_money"
                  name={modalType}
                  placeholder={modalType}
                  suffix={currency?.name}
                  min={0}
                />
              )}
            </Col>
          </Row>
        </CustomForm>
      </CustomModal>
    </span>
  );
};

export const CustomPosLayoutComponent = ({ setCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [posForm] = Form.useForm();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.selectedProduct) {
      const { selectedProduct } = state;
      setProducts([selectedProduct]);
      navigate(window.location.pathname, { replace: true });
    }
  }, [state, navigate]);

  const currency = useSelector(useCurrency);
  const [additionalForm] = Form.useForm();

  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
    units: {
      operator: {},
      operation_value: {},
    },
    order: {
      tax_rate: undefined,
      discount: undefined,
      discount_type: 'Fixed',
      shipping_cost: undefined,
      coupon: {
        coupon_id: undefined,
        type: undefined,
        rate: undefined,
        minimum_amount: undefined,
      },
    },
  });

  const resetFields = () => {
    setFormValues({
      product_list: {
        qty: {},
        sale_unit_id: {},
        net_unit_price: {},
        discount: {},
        tax_rate: {},
        tax: {},
        total: {},

        tax_id: {},
      },
      units: {
        operator: {},
        operation_value: {},
      },
      order: {
        tax_rate: undefined,
        discount: undefined,
        discount_type: 'Fixed',
        shipping_cost: undefined,
        coupon: {
          coupon_id: undefined,
          type: undefined,
          rate: undefined,
          minimum_amount: undefined,
        },
      },
    });

    setProducts([]);

    additionalForm.resetFields();
  };

  // const {
  //   totalItems,
  //   totalQuantity,
  //   totalPrice,
  //   taxRate,
  //   grandTotal,
  //   totalCoupon,
  //   totalDiscount,
  // } = calculateSummary(
  //   formValues,
  //   formValues.order.tax_rate ?? 0,
  //   formValues.order.discount ?? 0,
  //   formValues.order.shipping_cost ?? 0
  // );

  const warehouseId = Form.useWatch('warehouse_id', posForm);

  const [productEditModal, setProductEditModal] = useState(false);
  const [productId, setProductId] = useState(undefined);
  const [productName, setProductName] = useState(null);

  const handleProductEdit = (id, name) => {
    setProductId(id);
    setProductName(name);
    setProductEditModal(true);
  };

  const hideModal = () => {
    setProductEditModal(false);
  };

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      // selling_price: unit_cost,
      product_prices,
      sale_units,
      taxes,
      tax_method,
      product_qties,
    } = product ?? {};

    function getWarehousePrice(product_prices, warehouse_id) {
      const warehouse = product_prices?.find(
        (item) => item?.warehouse_id?.toString() === warehouse_id?.toString()
      );

      return warehouse ? warehouse?.price : product?.selling_price;
    }

    const unit_cost = getWarehousePrice(product_prices, warehouseId);

    const stock = getWarehouseQuantity(product_qties, warehouseId);

    const price = calculateUnitCost(
      sale_units,
      unit_cost,
      formValues?.units,
      id
    );

    updateFormValues(
      id,
      calculateOriginalPrice(price, taxes?.rate, tax_method),
      sale_units,
      taxes,
      formValues
    );

    return {
      id,
      name,
      sku,
      unitCost: showCurrency(
        formValues.product_list.net_unit_price[id],
        currency
      ),
      delete: true,
      discount: showCurrency(formValues.product_list.discount[id], currency),
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      stock,
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      onDelete,
      handleProductEdit,
      products,
      setProducts,
      formValues,
      setFormValues,
    };
  });

  const [summary, setSummary] = useState({});

  useEffect(() => {
    posForm.setFieldsValue(formValues);

    // const {
    //   totalItems,
    //   totalQuantity,
    //   totalPrice,
    //   taxRate,
    //   grandTotal,
    //   totalCoupon,
    //   totalDiscount,
    // } = calculateSummary(
    //   formValues,
    //   formValues.order.tax_rate ?? 0,
    //   formValues.order.discount ?? 0,
    //   formValues.order.shipping_cost ?? 0
    // );

    // console.log(
    //   calculateSummary(
    //     formValues,
    //     formValues.order.tax_rate ?? 0,
    //     formValues.order.discount ?? 0,
    //     formValues.order.shipping_cost ?? 0
    //   )
    // );

    // setSummary({
    //   totalItems,
    //   totalQuantity,
    //   totalPrice,
    //   taxRate,
    //   grandTotal,
    //   totalCoupon,
    //   totalDiscount,
    // });

    const data = calculateSummary(
      formValues,
      formValues.order.tax_rate ?? 0,
      formValues.order.discount ?? 0,
      formValues.order.shipping_cost ?? 0
    );

    setSummary(data);
  }, [formValues, products, posForm]);

  // console.log({ products });
  // console.log({ formValues });
  // console.log(summary);

  const tableStyleProps = {
    summary: () => {
      return (
        <Table.Summary fixed="bottom">
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={4}>
              <Typography.Text className="font-bold" type="">
                Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="center">
              <Typography.Text type="" className="font-bold">
                {summary?.totalQuantity}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(summary?.totalPrice, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
    sticky: {
      // offsetHeader: 440,
      offsetScroll: 400,
    },
    scroll: {
      x: 'min-content',
    },
  };

  const onDisountTypeChange = (value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      order: {
        ...prevFormValues.order,
        discount_type: value,
      },
    }));
    additionalForm.setFieldsValue({ discount_type: value });
  };

  // const formValuesRef = useRef(null);

  // const handleSubmit = useCallback((submitFunction) => {
  //   formValuesRef.current = submitFunction;
  // }, []);

  // const handleFormValues = () => {
  //   if (formValuesRef.current) {
  // const data = posForm.getFieldsValue([
  //   'sale_at',
  //   'warehouse_id',
  //   'cashier_id',
  //   'customer_id',
  //   'reference_number',
  // ]);

  // const fieldNames = {
  //   sale_at: 'Sale Date',
  //   warehouse_id: 'Warehouse',
  //   cashier_id: 'Cashier',
  //   customer_id: 'Customer',
  //   currency: 'Currency',
  //   exchange_rate: 'Exchange Rate',
  // };

  // const missingFields = Object.keys(data).filter(
  //   (key) =>
  //     key !== 'reference_number' &&
  //     (data[key] === undefined || data[key] === null)
  // );

  // if (missingFields.length > 0) {
  //   const missingFieldsNames = missingFields
  //     .map((key) => fieldNames[key])
  //     .join(', ');

  //   openNotification('error', `Missing: ${missingFieldsNames}.`);
  //   return;
  // }

  //     const formValues = formValuesRef.current();

  //     return { data, formValues };
  //   } else {
  //     return null;
  //   }
  // };

  // //payment
  // const paymentRef = useRef(null);

  // const handleGrandTotal = useCallback((submitFunction) => {
  //   paymentRef.current = submitFunction;
  // }, []);

  // const updateGrandTotal = () => {
  //   if (products.length === 0) {
  //     openNotification('error', 'Please add at least one products.');
  //     return null;
  //   }

  //   return paymentRef.current ? parseFloat(paymentRef.current()) : 0;
  // };

  // const resetRef = useRef(null);

  // const triggerReset = () => {
  //   return resetRef.current ? resetRef.current.resetFields() : null;
  // };

  // console.log(formValues);
  // console.log(products);

  return (
    <GlobalUtilityStyle className="lg:relative h-full">
      <div className="grow overflow-auto bg-[#F5F5F5]">
        <div className="lg:grid h-[95vh] grid-cols-6">
          <div className="col-span-4 relative">
            <div className="fixed z-50 flex w-full items-center justify-between bg-white px-5  shadow-md lg:hidden">
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
              </div>
              <Profile />
            </div>
            <div className="pt-20 lg:pt-0">
              <Form
                form={posForm}
                layout="vertical"
                autoComplete="on"
                scrollToFirstError
                className="h-[95vh]"
                noStyle
              >
                <div className="flex h-full flex-col p-4">
                  <div className="flex-none">
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
                            <WarehouseComponent label={false} />
                          </Col>
                          <Col span={8}>
                            <CashierComponent label={false} required={true} />
                          </Col>

                          <Col span={8}>
                            <CustomerComponent />
                          </Col>

                          <SearchProduct
                            products={products}
                            setProducts={setProducts}
                          />
                        </Row>
                      </div>
                    </GlobalUtilityStyle>
                  </div>

                  {/* <CustomPosProductsComponent
                    handleGrandTotal={handleGrandTotal}
                    products={products}
                    setProducts={setProducts}
                    handleSubmit={handleSubmit}
                    ref={resetRef}
                  /> */}
                  <div className="flex-grow overflow-y-auto bg-white">
                    <div className="flex-grow">
                      <CustomProductTable
                        columns={columns}
                        dataSource={dataSource}
                        showPaging={false}
                        tableStyleProps={tableStyleProps}
                      />
                    </div>

                    <ProductFormComponent
                      productEditModal={productEditModal}
                      productId={productId}
                      productName={productName}
                      hideModal={hideModal}
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                  </div>

                  <div className="flex flex-none flex-col gap-2 rounded-md bg-white px-2 pb-3 shadow-md">
                    <div className="grid grid-cols-2 gap-1 px-2 xl:grid-cols-3 xl:gap-2">
                      <div className="grid grid-cols-2">
                        <span>Items</span>
                        <span className="font-semibold">
                          {summary?.totalItems ?? 0}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span>Total</span>
                        <span className="font-semibold">
                          {showCurrency(summary?.totalPrice, currency)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <ModalComponent
                          title={'Discount'}
                          modalType={'discount'}
                          formValues={formValues}
                          setFormValues={setFormValues}
                          totalPrice={summary?.totalPrice ?? 0}
                          additionalForm={additionalForm}
                          onDisountTypeChange={onDisountTypeChange}
                        />

                        <span className="font-semibold">
                          {showCurrency(summary?.totalDiscount ?? 0, currency)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <ModalComponent
                          title={'Coupon'}
                          modalType={'coupon'}
                          setFormValues={setFormValues}
                          totalPrice={summary?.totalPrice ?? 0}
                          additionalForm={additionalForm}
                        />
                        <span className="font-semibold">
                          {showCurrency(summary?.totalCoupon ?? 0, currency)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <ModalComponent
                          title={'Vat'}
                          modalType={'tax'}
                          setFormValues={setFormValues}
                          additionalForm={additionalForm}
                        />
                        <span className="font-semibold">
                          {showCurrency(summary?.taxRate ?? 0, currency)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <ModalComponent
                          title={'Shipping Cost'}
                          modalType={'shipping_cost'}
                          setFormValues={setFormValues}
                          additionalForm={additionalForm}
                        />
                        <span className="font-semibold">
                          {showCurrency(
                            formValues.order.shipping_cost ?? 0,
                            currency
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="secondary-bg primary-text rounded-sm py-1 text-center text-lg font-semibold">
                      Grand Total{' '}
                      {showCurrency(summary?.grandTotal ?? 0, currency)}
                    </div>

                    <Button
                      type="primary"
                      onClick={resetFields}
                      className="flex items-center justify-center gap-2"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          <div className="lg:relative col-span-2 flex h-[95vh] flex-col overflow-y-auto overflow-x-hidden">
            <div className="hidden top-0 z-50 lg:flex w-full items-center justify-between bg-white px-5 shadow-md ">
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
        className="absolute bottom-0 z-40 w-full py-2 bg-white"
      >
        <Payment
          // handleSubmit={handleFormValues}
          // getGrandTotal={updateGrandTotal}
          form={posForm}
          summary={summary}
          formValues={formValues}
          handleReset={resetFields}
        />
      </Footer>
    </GlobalUtilityStyle>
  );
};
