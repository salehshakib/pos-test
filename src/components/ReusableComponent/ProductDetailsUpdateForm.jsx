import { Col, Form, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';

import { colLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useGetAllTaxQuery } from '../../redux/services/tax/taxApi';
import { useGetAllUnitQuery } from '../../redux/services/unit/unitApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';

const TaxComponent = ({ productId, setFormUpdateValues }) => {
  const params = useGlobalParams({
    selectValue: [...DEFAULT_SELECT_VALUES, 'rate'],
  });

  const { data, isLoading } = useGetAllTaxQuery({ params });

  const options = data?.results?.tax?.map((tax) => ({
    value: tax.id?.toString(),
    label: tax.name,
    rate: tax.rate,
  }));

  const onSelect = (value, option) => {
    setFormUpdateValues((prevValues) => ({
      ...prevValues,

      tax_rate: {
        ...prevValues.tax_rate,
        [productId]: option.rate,
      },
    }));
  };

  return (
    <CustomSelect
      name={['tax_id', productId]}
      options={options}
      label="Product VAT"
      isLoading={isLoading}
      onSelect={onSelect}
    />
  );
};

const ProductUnitComponent = ({
  productId,
  setFormUpdateValues,
  label = 'Selling Unit',
  name = 'sale_unit_id',
}) => {
  const params = useGlobalParams({
    selectValue: [...DEFAULT_SELECT_VALUES, 'operation_value', 'operator'],
  });

  const { data, isLoading } = useGetAllUnitQuery({ params });

  const productUnits = data?.results?.unit.map((unit) => ({
    value: unit.id.toString(),
    label: unit.name,
    operationValue: unit?.operation_value,
    operator: unit?.operator,
  }));

  const onSelect = (value, option) => {
    setFormUpdateValues((prevValues) => ({
      ...prevValues,

      operator: {
        ...prevValues.operator,
        [productId]: option.operator,
      },
      operation_value: {
        ...prevValues.operation_value,
        [productId]: option.operationValue,
      },
    }));
  };

  return (
    <CustomSelect
      label={label}
      options={productUnits}
      isLoading={isLoading}
      name={[name, productId]}
      onSelect={onSelect}
    />
  );
};

export const ProductFormComponent = ({
  productId,
  productName,
  productEditModal,
  hideModal,
  formValues,
  setFormValues,
}) => {
  const [productForm] = Form.useForm();

  const [formUpdateValues, setFormUpdateValues] = useState({
    tax_rate: {},

    operator: {},
    operation_value: {},
  });

  useEffect(() => {
    if (productId) {
      productForm.setFieldsValue({
        quantity: formValues?.product_list?.qty[productId],
        unit_discount: formValues?.product_list?.discount[productId],
        unit_price: formValues?.product_list?.net_unit_price[productId],
        sale_unit_id: {
          [productId]:
            formValues?.product_list?.sale_unit_id[productId]?.toString() ?? '',
        },
        tax_id: {
          [productId]: formValues?.product_list?.tax_id[productId]?.toString(),
        },
      });
    } else {
      productForm.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForm, productId]);

  const handleSubmit = () => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          qty: {
            ...prevFormValues.product_list.qty,
            [productId]: productForm.getFieldValue('quantity'),
          },
          sale_unit_id: {
            ...prevFormValues.product_list.sale_unit_id,
            [productId]: productForm.getFieldValue(['sale_unit_id', productId]),
          },
          net_unit_price: {
            ...prevFormValues.product_list.net_unit_price,
            [productId]: productForm.getFieldValue('unit_price'),
          },
          discount: {
            ...prevFormValues.product_list.discount,
            [productId]: productForm.getFieldValue('unit_discount'),
          },
          tax_rate: {
            ...prevFormValues.product_list.tax_rate,
            [productId]: formUpdateValues?.tax_rate[productId],
          },
          tax_id: {
            ...prevFormValues.product_list.tax_id,
            [productId]: productForm.getFieldValue(['tax_id', productId]),
          },
          // tax: {
          //   ...prevFormValues.product_list.tax,
          //   [productId]: parseFloat(
          //     (parseInt(productUnits.sale_units[productId]) *
          //       parseFloat(productUnits.tax_rate[productId]) *
          //       parseInt(productForm.getFieldValue('quantity')) *
          //       parseInt(productForm.getFieldValue('unit_price'))) /
          //       100
          //   ).toFixed(2),
          // },
        },
        units: {
          ...prevFormValues.units,
          operator: {
            ...prevFormValues.units.operator,
            [productId]: formUpdateValues?.operator[productId],
          },
          operation_value: {
            ...prevFormValues.units.operation_value,
            [productId]: formUpdateValues?.operation_value[productId],
          },
        },
      };
    });

    hideModal();
  };

  return (
    <Modal
      title={productName}
      open={productEditModal}
      onCancel={hideModal}
      centered
      width={800}
      okText="Update"
      onOk={handleSubmit}
    >
      <CustomForm submitBtn={false} form={productForm}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <CustomInput
              label="Quantity"
              type={'number'}
              name={'quantity'}
              placeholder={'Enter product name'}
            />
          </Col>
          <Col {...colLayout}>
            <CustomInput
              label="Unit Price"
              type={'number'}
              name={'unit_price'}
            />
          </Col>
          <Col {...colLayout}>
            <ProductUnitComponent
              productId={productId}
              setFormUpdateValues={setFormUpdateValues}
            />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              label="Unit Discount"
              type={'number'}
              name={'unit_discount'}
            />
          </Col>

          <Col {...mdColLayout}>
            <TaxComponent
              productId={productId}
              setFormUpdateValues={setFormUpdateValues}
            />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};
