import { Button, Col, Form, Modal, Row, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { colLayout, rowLayout } from '../../../layout/FormLayout';
import { useCurrency } from '../../../redux/services/pos/posSlice';
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
import { calculateUnitCost } from '../../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../../utilities/lib/updateFormValues/updateFormValues';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import { CustomQuantityInput } from '../../Shared/Input/CustomQuantityInput';
import { ProductController } from '../../Shared/ProductControllerComponent/ProductController';
import CustomSelect from '../../Shared/Select/CustomSelect';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    width: 100,
    render: (stock) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {stock}
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
        {unitCost}
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
            value={record.formValues?.product_list?.qty?.[record?.id] || 0}
          />
          <div>
            <Button
              key={'add'}
              icon={<FaPlus />}
              type="primary"
              onClick={() =>
                record.incrementCounter(
                  record?.id,
                  record?.setFormValues,
                  record?.stock
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
    title: 'Vat',
    dataIndex: 'tax',
    key: 'tax',
    align: 'center',
    width: 100,
    render: (tax) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {tax}
      </span>
    ),
  },
  {
    title: 'SubTotal',
    dataIndex: 'subTotal',
    key: 'subTotal',
    align: 'center',
    width: 150,
    render: (subTotal) => (
      <span className="text-dark dark:text-white87 text-xs font-medium md:text-sm">
        {subTotal}
      </span>
    ),
  },
  {
    title: <MdDelete className="w-full text-center text-lg md:text-xl" />,
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

const ProductUnitComponent = ({ productId, setFormUpdateValues }) => {
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
      label="Purchasing Unit"
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

  const [formUpdateValues, setFormUpdateValues] = useState({
    tax_rate: {},

    operator: {},
    operation_value: {},
  });

  useEffect(() => {
    if (productId) {
      productForm.setFieldsValue({
        quantity: formValues?.product_list?.qty[productId],
        unit_price: formValues?.product_list?.net_unit_cost[productId],
        purchase_unit_id: {
          [productId]:
            formValues?.product_list?.purchase_unit_id[productId]?.toString() ??
            '',
        },
        tax_id: {
          [productId]: formValues?.product_list?.tax_id[productId]?.toString(),
        },
      });
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

          net_unit_cost: {
            ...prevFormValues.product_list.net_unit_cost,
            [productId]: productForm.getFieldValue('unit_price'),
          },
          tax_rate: {
            ...prevFormValues.product_list.tax_rate,
            [productId]: formUpdateValues?.tax_rate[productId],
          },
          tax_id: {
            ...prevFormValues.product_list.tax_id,
            [productId]: productForm.getFieldValue(['tax_id', productId]),
          },
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
              setFormUpdateValues={setFormUpdateValues}
              productId={productId}
            />
          </Col>
        </Row>
      </CustomForm>
    </Modal>
  );
};

export const TransferProductTable = ({
  formValues,
  setFormValues,
  products,
  setProducts,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('from_warehouse_id', form);

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

  const currency = useSelector(useCurrency);

  const dataSource =
    products?.map((product) => {
      const {
        id,
        name,
        sku,
        buying_price: unit_cost,
        purchase_units,
        taxes,
        product_qties,
        tax_method,
      } = product ?? {};

      const stock = getWarehouseQuantity(product_qties, warehouseId);

      console.log(product);

      const price = calculateUnitCost(
        purchase_units,
        unit_cost,
        formValues?.units,
        id
      );

      console.log(price);

      updateFormValues(
        id,
        calculateOriginalPrice(price, taxes?.rate, tax_method),
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
        tax: showCurrency(formValues.product_list.tax[id], currency),
        subTotal: showCurrency(formValues.product_list.total[id], currency),
        onDelete,
        handleProductEdit,
        incrementCounter,
        decrementCounter,
        onQuantityChange,
        products,
        setProducts,
        formValues,
        setFormValues,
      };
    }) ?? [];

  console.log(formValues);

  const { totalQuantity, totalPrice, totalTax } = calculateTotals(formValues);

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
        columns={columns}
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
