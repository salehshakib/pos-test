import { Button, Col, Form, Row } from 'antd';
import { useState } from 'react';
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
import CustomInput from '../../Shared/Input/CustomInput';
import CustomModal from '../../Shared/Modal/CustomModal';
import CustomSelect from '../../Shared/Select/CustomSelect';
import ProductTableComponent from '../PosProductTableComponent';

const TaxComponent = ({ setFormValues }) => {
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
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        order: {
          ...prevValues.order,
          tax_rate: option.rate,
        },
      };
    });
  };
  return (
    <CustomSelect
      options={options}
      name={'tax_rate'}
      isLoading={isFetching}
      placeholder={'Vat'}
      onSelect={onSelect}
    />
  );
};

const CouponComponent = ({ setFormValues }) => {
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
    setFormValues((prevValues) => {
      return {
        ...prevValues,
        order: {
          ...prevValues.order,
          coupon: {
            ...prevValues.order.coupon,
            coupon_id: value,
            type: option.type,
            rate: option.rate,
            minimum_amount: option.minimum_amount,
          },
        },
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
  // handleSubmit,
  setFormValues,
}) => {
  const [additionalForm] = Form.useForm();
  const currency = useSelector(useCurrency);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideModal = () => setIsModalOpen(false);

  const showModal = () => setIsModalOpen(true);

  const handleSubmit = () => {
    const values = additionalForm.getFieldsValue();

    if (values.discount) {
      setFormValues((prevValues) => {
        return {
          ...prevValues,
          order: {
            ...prevValues.order,
            discount: values.discount,
          },
        };
      });
    }
    if (values.shipping_cost) {
      setFormValues((prevValues) => {
        return {
          ...prevValues,
          order: {
            ...prevValues.order,
            shipping_cost: values.shipping_cost,
          },
        };
      });
    }
  };

  return (
    <>
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
        footer={true}
        onOk={handleSubmit}
      >
        <Form
          form={additionalForm}
          layout="vertical"
          autoComplete="on"
          scrollToFirstError
        >
          <Row>
            <Col {...fullColLayout}>
              {modalType === 'tax' ? (
                <TaxComponent />
              ) : modalType === 'coupon' ? (
                <CouponComponent setFormValues={setFormValues} />
              ) : (
                <CustomInput
                  type="number_with_money"
                  name={modalType}
                  placeholder={modalType}
                  suffix={currency?.name}
                />
              )}
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
};

export const CustomPosRegisterComponent = ({ products, setProducts }) => {
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
      tax_rate: {},
      discount: {},
      shipping_cost: {},
      coupon: {
        coupon_id: {},
        type: {},
        rate: {},
        minimum_amount: {},
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
        tax_rate: {},
        discount: {},
        shipping_cost: {},
        coupon: {
          coupon_id: {},
          type: {},
          rate: {},
          minimum_amount: {},
        },
      },
    });

    setProducts([]);
  };

  const { totalItems, totalPrice, taxRate, grandTotal, totalCoupon } =
    calculateSummary(
      formValues,
      formValues.order.tax_rate ?? 0,
      formValues.order.discount ?? 0,
      formValues.order.shipping_cost ?? 0
    );

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
            <span className="font-semibold">{totalPrice}</span>
          </div>
          <div className="grid grid-cols-2">
            <ModalComponent
              title={'Discount'}
              modalType={'discount'}
              setFormValues={setFormValues}
            />

            <span className="font-semibold">
              {showCurrency(formValues.order.discount ?? 0)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <ModalComponent
              title={'Coupon'}
              modalType={'coupon'}
              setFormValues={setFormValues}
            />
            <span className="font-semibold">
              {showCurrency(totalCoupon ?? 0)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <ModalComponent
              title={'Vat'}
              modalType={'tax'}
              setFormValues={setFormValues}
            />
            <span className="font-semibold">{taxRate ?? 0}</span>
          </div>
          <div className="grid grid-cols-2">
            <ModalComponent
              title={'Shipping Cost'}
              modalType={'shipping_cost'}
              setFormValues={setFormValues}
            />
            <span className="font-semibold">
              {formValues.order.shipping_cost ?? 0}
            </span>
          </div>
        </div>

        <div className="secondary-bg primary-text rounded-sm py-1 text-center text-lg font-semibold">
          Grand Total {showCurrency(grandTotal ?? 0)}
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
