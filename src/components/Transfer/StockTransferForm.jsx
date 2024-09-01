import { Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';

import {
  colLayout,
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { useGetWarehousesQuery } from '../../redux/services/warehouse/warehouseApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import { getCurrentDate } from '../../utilities/lib/currentDate';
import {
  calculateGrandTotal,
  calculateTotalPrice,
} from '../../utilities/lib/generator/generatorUtils';
import { TotalRow } from '../ReusableComponent/TotalRow';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { StockTransferProductTable } from './overview/StockTransferProductTable';

const options = [
  {
    value: 'Sent',
    label: 'Send',
  },
];

// const useSetFieldValue = (field, value) => {
//   const form = Form.useFormInstance();
//   useEffect(() => {
//     form.setFieldValue(field, value);
//   }, [form, field, value]);
// };

const FileStatusComponent = ({ form }) => {
  // useSetFieldValue('status', options[0].value);

  useEffect(() => {
    form.setFieldValue('status', options[0].value);
  }, [form]);

  return (
    <CustomSelect
      label="File Status"
      placeholder={'File Status'}
      options={options}
      name={'status'}
    />
  );
};

const TransferDateComponent = ({ form }) => {
  // useSetFieldValue('date', getCurrentDate);

  useEffect(() => {
    form.setFieldValue('date', getCurrentDate);
  }, [form]);

  return (
    <CustomDatepicker
      label="Date"
      type={'date'}
      required={true}
      name={'date'}
    />
  );
};

const WarehouseTransferComponent = ({ fullLayout = false, warehouseData }) => {
  const form = Form.useFormInstance();

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const warehouseFromOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  const warehouseToOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
    disabled:
      warehouse.id.toString() === warehouseData?.from_warehouse_id.toString(),
  }));

  useEffect(() => {
    form.setFieldValue(
      'from_warehouse_id',
      warehouseData?.from_warehouse_id.toString()
    );
    form.setFieldValue(
      'to_warehouse_id',
      warehouseData?.to_warehouse_id.toString()
    );
  }, [form, warehouseData]);

  const handleFromWarehouseChange = () => {
    form.setFieldValue(
      'from_warehouse_id',
      warehouseData?.from_warehouse_id.toString()
    );
  };

  const handleToWarehouseChange = () => {
    form.setFieldValue(
      'to_warehouse_id',
      warehouseData?.to_warehouse_id.toString()
    );
  };

  return (
    <>
      <Col {...(fullLayout ? mdColLayout : largeLayout)}>
        <CustomSelect
          label="Warehouse (From)"
          placeholder={'Warehouse (From)'}
          showSearch={true}
          isLoading={isLoading}
          options={warehouseFromOptions}
          name="from_warehouse_id"
          required={true}
          onChange={handleFromWarehouseChange}
        />
      </Col>
      <Col {...(fullLayout ? mdColLayout : largeLayout)}>
        <CustomSelect
          label="Warehouse (To)"
          placeholder={'Warehouse (To)'}
          showSearch={true}
          isLoading={isLoading}
          options={warehouseToOptions}
          name="to_warehouse_id"
          required={true}
          onChange={handleToWarehouseChange}
        />
      </Col>
    </>
  );
};

export const StockTransferForm = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  setProductUnits,
  data,
  updatedProductList,
  setUpdatedProductList,
  ...props
}) => {
  const form = props.form;

  const shipping_cost = Form.useWatch('shipping_cost', form);

  const [totalItems, setTotalItems] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (!updatedProductList?.product_list) return;

    const calculatedTotalItems =
      Object.keys(updatedProductList?.product_list?.qty).length ?? 0;

    const calculatedTotalQty = Object.values(
      updatedProductList?.product_list?.qty
    ).reduce((acc, cur) => acc + (parseFloat(cur) || 0), 0);

    const calculatedTotalPrice = calculateTotalPrice(
      updatedProductList?.product_list
    );

    const calculatedGrandTotal = calculateGrandTotal(
      calculatedTotalPrice,
      0,
      0,
      0
    );

    setTotalItems(calculatedTotalItems);
    setTotalQty(calculatedTotalQty);
    setTotalPrice(calculatedTotalPrice);
    setGrandTotal(calculatedGrandTotal);
  }, [formValues, products, updatedProductList]);

  return (
    <>
      <CustomForm {...props}>
        <Row {...rowLayout}>
          <WarehouseTransferComponent warehouseData={data} />

          <Col {...largeLayout}>
            <TransferDateComponent form={form} />
          </Col>
          <Col {...largeLayout}>
            <FileStatusComponent form={form} />
          </Col>

          <StockTransferProductTable
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
            productUnits={productUnits}
            setProductUnits={setProductUnits}
            setUpdatedProductList={setUpdatedProductList}
            form={form}
          />

          <Col {...colLayout}>
            <CustomInput
              label="Shipping Cost"
              type={'number'}
              name={'shipping_cost'}
            />
          </Col>

          <Col {...fullColLayout}>
            <CustomUploader label={'Attach Document'} />
          </Col>

          <Col {...fullColLayout}>
            <CustomInput
              label="Transfer Note"
              type={'textarea'}
              name={'note'}
            />
          </Col>
        </Row>
      </CustomForm>

      <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      />
    </>
  );
};
