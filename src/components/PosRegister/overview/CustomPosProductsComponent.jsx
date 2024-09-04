import { Button, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
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

const ModalComponent = ({ title, modalType, setFormValues, totalPrice }) => {
  const [additionalForm] = Form.useForm();
  const currency = useSelector(useCurrency);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const showModal = () => setIsModalOpen(true);

  const [updatedFormValues, setUpdatedFormValues] = useState({
    discount: undefined,
    shipping_cost: undefined,
    tax_id: undefined,
    tax_rate: undefined,
    coupon_id: undefined,
    coupon_type: undefined,
    coupon_rate: undefined,
    minimum_amount: undefined,
  });

  //   const [fields, setFields] = useState([]);

  //   useEffect(() => {
  //     setFields([
  //       {
  //         name: 'discount',
  //         value: 0,
  //         errors: '',
  //       },
  //       {
  //         name: 'shipping_cost',
  //         value: 0,
  //         errors: '',
  //       },
  //     ]);
  //   }, []);

  const handleDiscountChange = (values) => {
    console.log(values);
    setUpdatedFormValues((prev) => {
      return {
        ...prev,
        discount: values,
      };
    });
  };

  const handleShippingCostChange = (values) => {
    setUpdatedFormValues((prev) => {
      return {
        ...prev,
        shipping_cost: values,
      };
    });
  };

  const handleSubmit = (values) => {
    console.log(updatedFormValues);

    if (updatedFormValues.tax_id) {
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
        tax_id: updatedFormValues.tax_id,
      });
    } else {
      //   setFormValues((prev) => {
      //     return {
      //       ...prev,
      //       order: {
      //         ...prev.order,
      //         tax_rate: undefined,
      //       },
      //     };
      //   });
      //   additionalForm.setFieldsValue({
      //     tax_id: undefined,
      //   });
    }

    // if (updatedFormValues.coupon_id) {
    //   if (
    //     updatedFormValues.minimum_amount &&
    //     Number(updatedFormValues.minimum_amount) >= Number(totalPrice)
    //   ) {
    //     openNotification(
    //       'error',
    //       'Coupon cannot be applied. Minimum amount is' +
    //         ' ' +
    //         updatedFormValues.minimum_amount
    //     );

    //     setUpdatedFormValues((prevValues) => {
    //       return {
    //         ...prevValues,
    //         coupon_id: undefined,
    //         coupon_type: undefined,
    //         coupon_rate: undefined,
    //         minimum_amount: undefined,
    //       };
    //     });

    //     setFormValues((prevValues) => {
    //       return {
    //         ...prevValues,
    //         order: {
    //           ...prevValues.order,
    //           coupon: {
    //             ...prevValues.order.coupon,
    //             type: undefined,
    //             rate: undefined,
    //             minimum_amount: undefined,
    //           },
    //         },
    //       };
    //     });

    //     additionalForm.setFieldsValue({
    //       coupon_id: undefined,
    //     });
    //   } else {
    //     setFormValues((prevValues) => {
    //       return {
    //         ...prevValues,
    //         order: {
    //           ...prevValues.order,
    //           coupon: {
    //             ...prevValues.order.coupon,
    //             type: updatedFormValues.coupon_type,
    //             rate: updatedFormValues.coupon_rate,
    //             minimum_amount: updatedFormValues.minimum_amount,
    //           },
    //         },
    //       };
    //     });

    //     additionalForm.setFieldsValue({
    //       coupon_id: updatedFormValues.coupon_id,
    //     });
    //   }
    // }

    // if (!values.coupon_id) {
    //   setFormValues((prevValues) => {
    //     return {
    //       ...prevValues,
    //       order: {
    //         ...prevValues.order,
    //         coupon: {
    //           ...prevValues.order.coupon,
    //           type: undefined,
    //           rate: undefined,
    //           minimum_amount: undefined,
    //         },
    //       },
    //     };
    //   });

    //   additionalForm.setFieldsValue({
    //     coupon_id: undefined,
    //   });
    // }

    // if (values.discount) {
    //   setFormValues((prevValues) => {
    //     return {
    //       ...prevValues,
    //       order: {
    //         ...prevValues.order,
    //         discount: values.discount,
    //       },
    //     };
    //   });

    //   additionalForm.setFieldsValue({
    //     discount: values.discount,
    //   });
    // }
    // else {
    //   setFormValues((prevValues) => {
    //     return {
    //       ...prevValues,
    //       order: {
    //         ...prevValues.order,
    //         discount: undefined,
    //       },
    //     };
    //   });

    //   additionalForm.setFieldsValue({
    //     discount: undefined,
    //   });
    // }

    console.log(values);

    // if (values.shipping_cost) {
    //   setFormValues((prevValues) => {
    //     return {
    //       ...prevValues,
    //       order: {
    //         ...prevValues.order,
    //         shipping_cost: values.shipping_cost,
    //       },
    //     };
    //   });
    //   additionalForm.setFieldsValue({
    //     shipping_cost: values.shipping_cost,
    //   });
    // }
    // else if(additionalForm.getFieldValue('shipping_cost')) {
    //   setFormValues((prevValues) => {
    //     return {
    //       ...prevValues,
    //       order: {
    //         ...prevValues.order,
    //         shipping_cost: undefined,
    //       },
    //     };
    //   });
    //   additionalForm.setFieldsValue({
    //     shipping_cost: undefined,
    //   });
    // }

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
        // onOk={handleSubmit}
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
                  onChange={
                    modalType === 'discount'
                      ? handleDiscountChange
                      : handleShippingCostChange
                  } //handleInputChange}
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
  onCustomSubmit,
  products,
  setProducts,
}) => {
  const currency = useSelector(useCurrency);

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
  };

  console.log(formValues);

  const { totalItems, totalQty, totalPrice, taxRate, grandTotal, totalCoupon } =
    calculateSummary(
      formValues,
      formValues.order.tax_rate ?? 0,
      formValues.order.discount ?? 0,
      formValues.order.shipping_cost ?? 0
    );

  return (
    // <ProductTableComponent
    //   products={products}
    //   setProducts={setProducts}
    //   formValues={formValues}
    //   setFormValues={setFormValues}
    // />

    <>
      <div className="flex-grow overflow-y-auto bg-white">
        <ProductTableComponent
          products={products}
          setProducts={setProducts}
          formValues={formValues}
          setFormValues={setFormValues}
          // productUnits={productUnits}
          // setProductUnits={setProductUnits}
          // tableStyleProps={item && tableStyleProps}
        />
      </div>

      <div className="flex flex-none flex-col gap-2 rounded-md bg-white px-2 pb-3 shadow-md">
        <div className="grid grid-cols-2 gap-1 px-2 xl:grid-cols-3 xl:gap-2">
          <div className="grid grid-cols-2">
            <span>Items</span>
            <span className="font-semibold">
              {/* {Object.keys(formValues.product_list.qty).length} */}
              {totalItems}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span>Total</span>
            <span className="font-semibold">
              {showCurrency(totalPrice, currency)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            {/* <span
                  className="flex items-center justify-start gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal('Discount')}
                >
                  Discount
                  <FaRegEdit className="primary-text" />
                </span> */}
            <ModalComponent
              title={'Discount'}
              modalType={'discount'}
              // handleSubmit={onCustomSubmit}
              setFormValues={setFormValues}
            />

            {/* <Form.Item name="Discount" noStyle></Form.Item> */}
            <span className="font-semibold">
              {showCurrency(formValues.order.discount ?? 0, currency)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            {/* <span
              className="flex items-center justify-start gap-2 hover:cursor-pointer hover:underline"
              onClick={() => showModal('Coupon')}
            >
              Coupon
              <FaRegEdit className="primary-text" />
            </span>
            <Form.Item name="Coupon" noStyle></Form.Item>
            <span className="font-semibold">{coupon ?? 0}</span> */}
            <ModalComponent
              title={'Coupon'}
              modalType={'coupon'}
              // handleSubmit={onCustomSubmit}
              setFormValues={setFormValues}
              totalPrice={totalPrice}
            />
            <span className="font-semibold">
              {showCurrency(totalCoupon ?? 0, currency)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            {/* <span
              className="flex items-center justify-start gap-2 hover:cursor-pointer hover:underline"
              onClick={() => showModal('Tax')}
            >
              Vat
              <FaRegEdit className="primary-text" />
            </span>
            <Form.Item name="Tax" noStyle></Form.Item> */}
            <ModalComponent
              title={'Vat'}
              modalType={'tax'}
              // handleSubmit={onCustomSubmit}
              setFormValues={setFormValues}
            />
            <span className="font-semibold">
              {showCurrency(taxRate ?? 0, currency)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            {/* <span
              className="flex items-center justify-start gap-2 hover:cursor-pointer hover:underline"
              onClick={() => showModal('Shipping Cost')}
            >
              Shipping
              <FaRegEdit className="primary-text" />
            </span>
            <Form.Item name="Shipping" noStyle></Form.Item> */}
            <ModalComponent
              title={'Shipping Cost'}
              modalType={'shipping_cost'}
              // handleSubmit={onCustomSubmit}
              setFormValues={setFormValues}
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
