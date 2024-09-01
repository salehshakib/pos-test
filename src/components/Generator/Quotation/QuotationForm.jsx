import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../../layout/FormLayout';
import { CashierComponent } from '../../ReusableComponent/CashierComponent';
import { OrderTaxComponent } from '../../ReusableComponent/OrderTaxComponent';
import { SupplierComponent } from '../../ReusableComponent/SupplierComponent';
import { WarehouseComponent } from '../../ReusableComponent/WarehouseComponent';
import CustomForm from '../../Shared/Form/CustomForm';
import CustomInput from '../../Shared/Input/CustomInput';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomUploader from '../../Shared/Upload/CustomUploader';
import { CustomQuotationProductTable } from './overview/CustomQuotationProductTable';

const options = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Sent',
    label: 'Sent',
  },
];

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue('status', 'Pending');
  }, [form]);

  return <CustomSelect label="Status" options={options} name={'status'} />;
};

export const QuotationForm = ({
  // formValues,
  // setFormValues,
  // products,
  // setProducts,
  // productUnits,
  // setProductUnits,
  data,
  ...props
}) => {
  // const form = props.form;

  // const discount = Form.useWatch('discount', form);
  // const shipping_cost = Form.useWatch('shipping_cost', form);
  // const tax_rate = Form.useWatch('tax_rate', form);

  // const [totalItems, setTotalItems] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  // const [taxRate, setTaxRate] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);

  // useEffect(() => {
  //   const calculatedTotalItems =
  //     Object.keys(formValues.product_list?.qty).length ?? 0;

  //   const calculatedTotalQty = Object.values(
  //     formValues.product_list?.qty
  //   ).reduce((acc, cur) => acc + (parseFloat(cur) || 0), 0);

  //   const calculatedTotalPrice = calculateTotalPrice(formValues.product_list);

  //   const orderTax = calculateTotalTax(
  //     calculatedTotalPrice,
  //     tax_rate,
  //     discount
  //   );

  //   const calculatedGrandTotal = calculateGrandTotal(
  //     calculatedTotalPrice,
  //     tax_rate ?? 0,
  //     discount,
  //     shipping_cost
  //   );

  //   setTotalItems(calculatedTotalItems);
  //   setTotalQty(calculatedTotalQty);
  //   setTotalPrice(calculatedTotalPrice);
  //   setGrandTotal(calculatedGrandTotal);
  //   setTaxRate(orderTax);
  // }, [discount, formValues, shipping_cost, tax_rate, products]);

  // const warehouseId = Form.useWatch('warehouse_id', props.form);

  // useEffect(() => {
  //   if (warehouseId) {
  //     setFormValues({
  //       product_list: {
  //         qty: {},
  //         sale_unit_id: {},
  //         net_unit_price: {},
  //         discount: {},
  //         tax_rate: {},
  //         tax: {},
  //         total: {},

  //         tax_id: {},
  //       },
  //     });

  //     setProducts([]);

  //     setProductUnits({
  //       sale_units: {},
  //       tax_rate: {},
  //       inclusive_tax_rate: {},
  //     });
  //   }
  // }, [setFormValues, setProductUnits, setProducts, warehouseId]);

  const productsRef = useRef(null);

  const handleProducts = useCallback((submitFunction) => {
    productsRef.current = submitFunction;
  }, []);

  const handleSubmit = (values) => {
    const productsData = productsRef.current ? productsRef.current() : null;

    const formValues = {
      product_list: productsData.product_list,
    };

    props.handleSubmit(values, { formValues });
  };

  const quotationRef = useRef(null);

  return (
    <>
      <CustomForm {...props} handleSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <WarehouseComponent warehouseRef={quotationRef} />
          </Col>
          <Col {...colLayout}>
            <CashierComponent />
          </Col>
          <Col {...colLayout}>
            <SupplierComponent />
          </Col>

          {/* <QuotationProductTable
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
            productUnits={productUnits}
            setProductUnits={setProductUnits}
          /> */}

          <CustomQuotationProductTable
            onCustomSubmit={handleProducts}
            data={data}
            ref={quotationRef}
          >
            <Col {...largeLayout}>
              <OrderTaxComponent />
            </Col>
            <Col {...largeLayout}>
              <CustomInput label="Discount" type={'number'} name={'discount'} />
            </Col>
            <Col {...largeLayout}>
              <CustomInput
                label="Shipping Cost"
                type={'number'}
                name={'shipping_cost'}
              />
            </Col>
            <Col {...largeLayout}>
              <StatusComponent />
            </Col>

            <Col {...fullColLayout}>
              <CustomUploader label="Attachment" name={'attachment'} />
            </Col>
            <Col {...fullColLayout}>
              <CustomInput label="Note" type={'textarea'} name={'note'} />
            </Col>
          </CustomQuotationProductTable>
        </Row>
      </CustomForm>

      {/* <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        taxRate={taxRate ?? 0}
        discount={discount ?? 0}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      /> */}
    </>
  );
};
