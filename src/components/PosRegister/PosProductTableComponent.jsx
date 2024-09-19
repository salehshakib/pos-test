import { Button, Form, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { FaEdit, FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { GlobalUtilityStyle } from '../../container/Styled';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { calculateOriginalPrice } from '../../utilities/lib/calculatePrice';
import { calculateTotals } from '../../utilities/lib/calculateTotals';
import { showCurrency } from '../../utilities/lib/currency';
import { getWarehouseQuantity } from '../../utilities/lib/getWarehouseQty';
import {
  decrementCounter,
  incrementCounter,
  onDelete,
  onQuantityChange,
} from '../../utilities/lib/productTable/counters';
import { calculateUnitCost } from '../../utilities/lib/updateFormValues/calculateById';
import { updateFormValues } from '../../utilities/lib/updateFormValues/updateFormValues';
import { ProductFormComponent } from '../ReusableComponent/ProductDetailsUpdateForm';
import { CustomQuantityInput } from '../Shared/Input/CustomQuantityInput';
import CustomProductTable from '../Shared/Table/CustomProductTable';

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

// const TaxComponent = ({ productId, setFormUpdateValues }) => {
//   const params = useGlobalParams({
//     selectValue: [...DEFAULT_SELECT_VALUES, 'rate'],
//   });

//   const { data, isLoading } = useGetAllTaxQuery({ params });

//   const options = data?.results?.tax?.map((tax) => ({
//     value: tax.id?.toString(),
//     label: tax.name,
//     rate: tax.rate,
//   }));

//   const onSelect = (value, option) => {
//     setFormUpdateValues((prevValues) => ({
//       ...prevValues,

//       tax_rate: {
//         ...prevValues.tax_rate,
//         [productId]: option.rate,
//       },
//     }));
//   };

//   return (
//     <CustomSelect
//       name={['tax_id', productId]}
//       options={options}
//       label="Product Vat"
//       isLoading={isLoading}
//       onSelect={onSelect}
//     />
//   );
// };

// const ProductUnitComponent = ({ productId, setFormUpdateValues }) => {
//   const params = useGlobalParams({
//     selectValue: [...DEFAULT_SELECT_VALUES, 'operation_value', 'operator'],
//   });

//   const { data, isLoading } = useGetAllUnitQuery({ params });

//   const productUnits = data?.results?.unit.map((unit) => ({
//     value: unit.id.toString(),
//     label: unit.name,
//     operationValue: unit.operation_value,
//     operator: unit.operator,
//   }));

//   const onSelect = (value, option) => {
//     setFormUpdateValues((prevValues) => ({
//       ...prevValues,

//       operator: {
//         ...prevValues.operator,
//         [productId]: option.operator,
//       },
//       operation_value: {
//         ...prevValues.operation_value,
//         [productId]: option.operationValue,
//       },
//     }));
//   };

//   return (
//     <CustomSelect
//       label="Sale Unit"
//       options={productUnits}
//       isLoading={isLoading}
//       name={['sale_unit_id', productId]}
//       onSelect={onSelect}
//     />
//   );
// };

// const ProductFormComponent = ({
//   productId,
//   productName,
//   productEditModal,
//   hideModal,
//   formValues,
//   setFormValues,
//   productUnits,
//   setProductUnits,
// }) => {
//   const [productForm] = Form.useForm();

//   useEffect(() => {
//     if (productId) {
//       productForm.setFieldsValue({
//         quantity: formValues?.product_list?.qty[productId],
//         unit_discount: formValues?.product_list?.discount[productId],
//         unit_price: formValues?.product_list?.net_unit_price[productId],
//         sale_unit_id: {
//           [productId]:
//             formValues?.product_list?.sale_unit_id[productId]?.toString() ?? '',
//         },
//         tax_id: {
//           [productId]: formValues?.product_list?.tax_id[productId]?.toString(),
//         },
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formValues, productForm, productId]);

//   const handleSubmit = () => {
//     setFormValues((prevFormValues) => {
//       return {
//         ...prevFormValues,
//         product_list: {
//           ...prevFormValues.product_list,
//           qty: {
//             ...prevFormValues.product_list.qty,
//             [productId]: productForm.getFieldValue('quantity'),
//           },
//           sale_unit_id: {
//             ...prevFormValues.product_list.sale_unit_id,
//             [productId]: productForm.getFieldValue(['sale_unit_id', productId]),
//           },
//           discount: {
//             ...prevFormValues.product_list.discount,
//             [productId]: productForm.getFieldValue('unit_discount'),
//           },
//           net_unit_price: {
//             ...prevFormValues.product_list.net_unit_price,
//             [productId]: productForm.getFieldValue('unit_price'),
//           },
//           tax_rate: {
//             ...prevFormValues.product_list.tax_rate,
//             [productId]: productUnits?.tax_rate[productId],
//           },
//           tax: {
//             ...prevFormValues.product_list.tax,
//             [productId]: parseFloat(
//               (parseInt(productUnits.sale_units[productId]) *
//                 parseInt(productUnits.tax_rate[productId]) *
//                 parseInt(productForm.getFieldValue('quantity')) *
//                 parseInt(productForm.getFieldValue('unit_price'))) /
//                 100
//             ).toFixed(2),
//           },
//           tax_id: {
//             ...prevFormValues.product_list.tax_id,
//             [productId]: productForm.getFieldValue(['tax_id', productId]),
//           },
//         },
//       };
//     });

//     hideModal();
//   };

//   return (
//     <Modal
//       title={productName}
//       open={productEditModal}
//       onCancel={hideModal}
//       centered
//       width={800}
//       okText="Update"
//       onOk={handleSubmit}
//     >
//       <CustomForm submitBtn={false} form={productForm}>
//         <Row {...rowLayout}>
//           <Col {...colLayout}>
//             <CustomInput
//               label="Quantity"
//               type={'number'}
//               name={'quantity'}
//               placeholder={'Enter product name'}
//             />
//           </Col>
//           <Col {...colLayout}>
//             <CustomInput
//               label="Unit Price"
//               type={'number'}
//               name={'unit_price'}
//             />
//           </Col>
//           <Col {...colLayout}>
//             <ProductUnitComponent
//               setProductUnits={setProductUnits}
//               productId={productId}
//             />
//           </Col>
//           <Col {...mdColLayout}>
//             <CustomInput
//               label="Unit Discount"
//               type={'number'}
//               name={'unit_discount'}
//             />
//           </Col>

//           <Col {...mdColLayout}>
//             <TaxComponent
//               productId={productId}
//               setProductUnits={setProductUnits}
//             />
//           </Col>
//         </Row>
//       </CustomForm>
//     </Modal>
//   );
// };

const ProductTableComponent = ({
  products,
  setProducts,
  formValues,
  setFormValues,
}) => {
  const form = Form.useFormInstance();
  const warehouseId = Form.useWatch('warehouse_id', form);

  const currency = useSelector(useCurrency);

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

  const { totalQuantity, totalPrice } = calculateTotals(formValues);

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

  return (
    <GlobalUtilityStyle className="">
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
    </GlobalUtilityStyle>
  );
};

export default ProductTableComponent;
