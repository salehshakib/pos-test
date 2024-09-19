import { Button, Col, Form, Row, Table, Typography } from 'antd';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { FaEdit, FaMinus, FaPlus, FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { useGetAllCouponQuery } from '../../../redux/services/coupon/couponApi';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAllTaxQuery } from '../../../redux/services/tax/taxApi';
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
import { ProductFormComponent } from '../../ReusableComponent/ProductDetailsUpdateForm';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import CustomModal from '../../Shared/Modal/CustomModal';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomProductTable from '../../Shared/Table/CustomProductTable';

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
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
    width: 100,
    render: (sku) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {sku}
      </span>
    ),
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 60,
    render: (stock) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
        <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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
    width: 100,
    render: (subTotal) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
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

  const options = data?.results?.coupon?.map((item) => {
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
      //   return {
      //     ...prevValues,
      //     order: {
      //       ...prevValues.order,
      //       coupon: {
      //         ...prevValues.order.coupon,
      //         type: option.type,
      //         rate: option.rate,
      //         minimum_amount: option.minimum_amount,
      //       },
      //     },
      //   };

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
  setFormValues,
  totalPrice,
  additionalForm,
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

export const CustomPosProductsComponent = forwardRef(
  ({ products, setProducts, handleGrandTotal, handleSubmit }, ref) => {
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
        shipping_cost: undefined,
        coupon: {
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
          shipping_cost: undefined,
          coupon: {
            type: undefined,
            rate: undefined,
            minimum_amount: undefined,
          },
        },
      });

      setProducts([]);

      additionalForm.resetFields();
    };

    const {
      totalItems,
      totalQuantity,
      totalPrice,
      taxRate,
      grandTotal,
      totalCoupon,
    } = calculateSummary(
      formValues,
      formValues.order.tax_rate ?? 0,
      formValues.order.discount ?? 0,
      formValues.order.shipping_cost ?? 0
    );

    const handleFormValuesSubmit = useCallback(() => {
      return formValues;
    }, [formValues]);

    useEffect(() => {
      handleSubmit(handleFormValuesSubmit);
    }, [handleFormValuesSubmit, handleSubmit]);

    const handleGrandTotalSubmit = useCallback(() => {
      return grandTotal;
    }, [grandTotal]);

    useEffect(() => {
      handleGrandTotal(handleGrandTotalSubmit);
    }, [handleGrandTotalSubmit, handleGrandTotal]);

    const form = Form.useFormInstance();
    const warehouseId = Form.useWatch('warehouse_id', form);

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
        selling_price: unit_cost,
        sale_units,
        taxes,
        tax_method,
        product_qties,
      } = product ?? {};

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

    useEffect(() => {
      form.setFieldsValue(formValues);
    }, [formValues, products, form]);

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
                  {totalQuantity}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="center">
                <Typography.Text type="" className="font-bold">
                  {showCurrency(totalPrice, currency)}
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

    useImperativeHandle(ref, () => ({
      resetFields,
    }));

    return (
      <>
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
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="grid grid-cols-2">
              <span>Total</span>
              <span className="font-semibold">
                {showCurrency(totalPrice, currency)}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <ModalComponent
                title={'Discount'}
                modalType={'discount'}
                setFormValues={setFormValues}
                additionalForm={additionalForm}
              />

              <span className="font-semibold">
                {showCurrency(formValues.order.discount ?? 0, currency)}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <ModalComponent
                title={'Coupon'}
                modalType={'coupon'}
                setFormValues={setFormValues}
                totalPrice={totalPrice}
                additionalForm={additionalForm}
              />
              <span className="font-semibold">
                {showCurrency(totalCoupon ?? 0, currency)}
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
                {showCurrency(taxRate ?? 0, currency)}
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
                {showCurrency(formValues.order.shipping_cost ?? 0, currency)}
              </span>
            </div>
          </div>

          <div className="secondary-bg primary-text rounded-sm py-1 text-center text-lg font-semibold">
            Grand Total {showCurrency(grandTotal ?? 0, currency)}
          </div>

          <Button
            type="primary"
            onClick={resetFields}
            className="flex items-center justify-center gap-2"
          >
            Reset
          </Button>
        </div>
      </>
    );
  }
);

CustomPosProductsComponent.displayName = 'CustomPosProductsComponent';
