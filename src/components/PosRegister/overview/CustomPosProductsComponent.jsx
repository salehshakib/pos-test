import { Button, Col, Form, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { fullColLayout } from '../../../layout/FormLayout';
import { useGetAllCouponQuery } from '../../../redux/services/coupon/couponApi';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAllTaxQuery } from '../../../redux/services/tax/taxApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { showCurrency } from '../../../utilities/lib/currency';
import { calculateSummary } from '../../../utilities/lib/generator/generatorUtils';
import { openNotification } from '../../../utilities/lib/openToaster';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomModal from '../../Shared/Modal/CustomModal';
import CustomSelect from '../../Shared/Select/CustomSelect';
import ProductTableComponent from '../PosProductTableComponent';

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

export const CustomPosProductsComponent = ({
  products,
  setProducts,
  handleGrandTotal,
  handleSubmit,
}) => {
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

  const { totalItems, totalPrice, taxRate, grandTotal, totalCoupon } =
    calculateSummary(
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

  return (
    <>
      <div className="flex-grow overflow-y-auto bg-white">
        <ProductTableComponent
          products={products}
          setProducts={setProducts}
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
};
