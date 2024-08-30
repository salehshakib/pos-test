import { Col, Form, Modal, Row, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { colLayout, mdColLayout, rowLayout } from '../../../layout/FormLayout';
import { useCurrency } from '../../../redux/services/pos/posSlice';
import { useGetAllTaxQuery } from '../../../redux/services/tax/taxApi';
import { useGetAllUnitQuery } from '../../../redux/services/unit/unitApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { calculateOriginalPrice } from '../../../utilities/lib/calculatePrice';
import { calculateTotals } from '../../../utilities/lib/calculateTotals';
import { showCurrency } from '../../../utilities/lib/currency';
import { getWarehouseQuantity } from '../../../utilities/lib/getWarehouseQty';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../../utilities/lib/productTable/counters';
import { updateFormValues } from '../../../utilities/lib/updateFormValues/updateFormValues';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import { ProductController } from '../../Shared/ProductControllerComponent/ProductController';
import CustomSelect from '../../Shared/Select/CustomSelect';
import { columns, partialColumns } from './productColumns';

const TaxComponent = ({ productId, setProductUnits }) => {
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
    setProductUnits((prevValues) => ({
      ...prevValues,
      tax_rate: {
        ...prevValues.tax_rate,
        [productId]: option.rate ?? 0,
      },
    }));
  };

  return (
    <CustomSelect
      name={['tax_id', productId]}
      options={options}
      label="Product Vat"
      isLoading={isLoading}
      onSelect={onSelect}
    />
  );
};

const ProductUnitComponent = ({ setFormValues, productId }) => {
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
    setFormValues((prevValues) => ({
      ...prevValues,
      units: {
        ...prevValues.units,
        [productId]: option.operationValue ?? 1,
      },
    }));
  };

  return (
    <CustomSelect
      label="Purchase Unit"
      options={productUnits}
      isLoading={isLoading}
      name={['purchase_unit_id', productId]}
      onSelect={onSelect}
    />
  );
};

const ProductFormComponent = ({
  productId,
  productName,
  productEditModal,
  hideModal,
  formValues,
  setFormValues,
}) => {
  const [productForm] = Form.useForm();

  useEffect(() => {
    if (productId) {
      productForm.setFieldsValue({
        quantity: formValues?.product_list?.qty[productId],
        unit_discount: formValues?.product_list?.discount[productId],
        unit_price: formValues?.product_list?.net_unit_cost[productId],
        purchase_unit_id: {
          [productId]:
            formValues?.product_list?.purchase_unit_id[productId]?.toString() ??
            '',
        },
        tax_id: {
          [productId]:
            formValues?.product_list?.tax_id[productId]?.toString() ?? '',
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
          purchase_unit_id: {
            ...prevFormValues.product_list.purchase_unit_id,
            [productId]: productForm.getFieldValue([
              'purchase_unit_id',
              productId,
            ]),
          },
          discount: {
            ...prevFormValues.product_list.discount,
            [productId]: productForm.getFieldValue('unit_discount'),
          },
          net_unit_cost: {
            ...prevFormValues.product_list.net_unit_cost,
            [productId]: productForm.getFieldValue('unit_price'),
          },
          tax_rate: {
            ...prevFormValues.product_list.tax_rate,
            [productId]: formValues?.taxData?.tax_rate[productId],
          },
          tax: {
            ...prevFormValues.product_list.tax,
            [productId]: parseFloat(
              (parseInt(productUnits.purchase_units[productId]) *
                parseFloat(productUnits.tax_rate[productId]) *
                parseInt(productForm.getFieldValue('quantity')) *
                parseInt(productForm.getFieldValue('unit_price'))) /
                100
            ).toFixed(2),
          },
          tax_id: {
            ...prevFormValues.product_list.tax_id,
            [productId]: productForm.getFieldValue(['tax_id', productId]),
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
              setFormValues={setFormValues}
              productId={productId}
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
            <TaxComponent productId={productId} setFormValues={setFormValues} />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};

// function updateFormValues(id, unitCost, productUnitData, taxData, formValues) {
//   if (!id) return;

//   const sanitizeValue = (value, sanitizer, defaultValue = 0) =>
//     sanitizer(value ?? defaultValue);

//   const formProductList = formValues.product_list;
//   const formUnitList = formValues.units;

//   const getSanitizedValue = (field, defaultValue, sanitizer) =>
//     sanitizeValue(formProductList[field]?.[id], sanitizer, defaultValue);

//   const setFormValue = (field, value) => {
//     formProductList[field][id] = value;
//   };

//   const qty = getSanitizedValue('qty', 1, parseInt);
//   let productUnitCost = unitCost;

//   const calculateProductUnitCost = (field) => {
//     if (formProductList[field]) {
//       productUnitCost = getSanitizedValue(field, unitCost, parseFloat);
//       setFormValue(field, productUnitCost);
//     }
//   };

//   calculateProductUnitCost('net_unit_cost');
//   calculateProductUnitCost('net_unit_price');

//   const discount = getSanitizedValue('discount', 0, parseFloat);
//   const taxRate = getSanitizedValue('tax_rate', taxData?.rate ?? 0, parseFloat);
//   const productUnitOperator = formUnitList.operator[id] ?? productUnitData?.operator;
//   const productUnitOperationValue = sanitizeValue(
//     formUnitList.operation_value[id],
//     parseFloat,
//     parseFloat(productUnitData?.operation_value) || 1
//   );

//   const calculateTax = () => {
//     const baseValue = (productUnitCost - discount) * qty;
//     const taxAmount = productUnitOperator === '/'
//       ? (taxRate * baseValue) / (100 * productUnitOperationValue)
//       : (productUnitOperationValue * taxRate * baseValue) / 100;

//     return sanitizeValue(taxAmount.toFixed(2), parseFloat);
//   };

//   const tax = calculateTax();

//   const calculateTotal = (netUnitCost) => {
//     const baseValue = productUnitOperator === '/'
//       ? (netUnitCost * qty) / productUnitOperationValue
//       : productUnitOperationValue * netUnitCost * qty;

//     return taxData?.tax_method === 'Inclusive'
//       ? Math.round((baseValue - discount + tax).toFixed(2))
//       : Math.round((baseValue + tax - discount).toFixed(2));
//   };

//   const total = calculateTotal(productUnitCost);

//   // Set form values
//   setFormValue('qty', qty);

//   if (formProductList.purchase_unit_id) {
//     setFormValue(
//       'purchase_unit_id',
//       formProductList.purchase_unit_id[id] ?? productUnitData?.id
//     );
//   }

//   if (formProductList.sale_unit_id) {
//     setFormValue(
//       'sale_unit_id',
//       formProductList.sale_unit_id[id] ?? productUnitData?.id
//     );
//   }

//   setFormValue('discount', discount);
//   setFormValue('tax_rate', taxRate);
//   setFormValue('tax', tax);
//   setFormValue('total', total);

//   if (formProductList?.recieved) {
//     setFormValue('recieved', formProductList.recieved[id]);
//   }
// }

export const PurchaseProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();
  const type = Form.useWatch('purchase_status', form);
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

  const incrementReceivedCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.recieved[id] || 0;
      const newQty = parseInt(currentQty) + 1;

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          recieved: {
            ...prevFormValues.product_list.recieved,
            [id]: newQty,
          },
        },
      };
    });
  };

  const decrementReceivedCounter = (id) => {
    setFormValues((prevFormValues) => {
      const currentQty = prevFormValues.product_list.recieved[id] || 0;
      const newQty = Math.min(parseInt(currentQty) - 1, 0);

      return {
        ...prevFormValues,
        product_list: {
          ...prevFormValues.product_list,
          recieved: {
            ...prevFormValues.product_list.recieved,
            [id]: newQty,
          },
        },
      };
    });
  };

  const onReceivedChange = (id, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      product_list: {
        ...prevFormValues.product_list,
        recieved: {
          ...prevFormValues.product_list.recieved,
          [id]: parseInt(value, 10) || 0,
        },
      },
    }));
  };

  const currency = useSelector(useCurrency);

  const dataSource = products?.map((product) => {
    const {
      id,
      name,
      sku,
      buying_price: unit_cost,
      purchase_units,
      taxes,
      tax_method,
      product_qties,
    } = product ?? {};

    const stock = getWarehouseQuantity(product_qties, warehouseId);

    updateFormValues(
      id,
      calculateOriginalPrice(unit_cost, taxes?.rate, tax_method),
      purchase_units,
      taxes,
      formValues
    );

    return {
      id,
      name,
      sku,
      unitCost: showCurrency(
        formValues.product_list.net_unit_cost[id],
        currency
      ),
      delete: true,
      stock,
      discount: showCurrency(formValues.product_list.discount[id], currency),
      tax: showCurrency(formValues.product_list.tax[id], currency),
      subTotal: showCurrency(formValues.product_list.total[id], currency),
      incrementCounter,
      decrementCounter,
      onQuantityChange,
      incrementReceivedCounter,
      decrementReceivedCounter,
      onReceivedChange,
      onDelete,
      handleProductEdit,
      products,
      setProducts,
      formValues,
      setFormValues,
    };
  });

  const { totalQuantity, totalReceived, totalPrice, totalTax, totalDiscount } =
    calculateTotals(formValues);

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues, products, form]);

  const tableStyle = {
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
            {type === 'Partial' && (
              <Table.Summary.Cell index={3} align="center">
                <Typography.Text type="" className="font-bold">
                  {totalReceived}
                </Typography.Text>
              </Table.Summary.Cell>
            )}
            <Table.Summary.Cell index={4} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalDiscount, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalTax, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6} align="center">
              <Typography.Text type="" className="font-bold">
                {showCurrency(totalPrice, currency)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
  };

  return (
    <>
      <ProductController
        products={products}
        setProducts={setProducts}
        columns={type === 'Partial' ? partialColumns : columns}
        dataSource={dataSource}
        tableStyle={tableStyle}
      />

      <ProductFormComponent
        productEditModal={productEditModal}
        productId={productId}
        productName={productName}
        hideModal={hideModal}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </>
  );
};
