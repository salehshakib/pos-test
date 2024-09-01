import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';

import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { getCurrentDate } from '../../utilities/lib/currentDate';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomTransferProductComponent } from './overview/CustomTransferProductComponent';
import { WarehouseTransferComponent } from './WarehouseTransferComponent';

const options = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Sent',
    label: 'Send',
  },
];

const FileStatusComponent = () => {
  const form = Form.useFormInstance();

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

const TransferDateComponent = () => {
  const form = Form.useFormInstance();

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

const TransferForm = ({
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

  // const shipping_cost = Form.useWatch('shipping_cost', form);

  // const [totalItems, setTotalItems] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [grandTotal, setGrandTotal] = useState(0);

  // useEffect(() => {
  //   const calculatedTotalItems =
  //     Object.keys(formValues.product_list?.qty).length ?? 0;

  //   const calculatedTotalQty = Object.values(
  //     formValues.product_list?.qty
  //   ).reduce((acc, cur) => acc + (parseFloat(cur) || 0), 0);

  //   const calculatedTotalPrice = calculateTotalPrice(formValues.product_list);

  //   const calculatedGrandTotal = calculateGrandTotal(
  //     calculatedTotalPrice,
  //     0,
  //     0,
  //     shipping_cost
  //   );

  //   setTotalItems(calculatedTotalItems);
  //   setTotalQty(calculatedTotalQty);
  //   setTotalPrice(calculatedTotalPrice);
  //   setGrandTotal(calculatedGrandTotal);
  // }, [formValues, shipping_cost, products]);

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

  const transferRef = useRef(null);

  return (
    <>
      <CustomForm {...props} onSubmit={handleSubmit}>
        <Row {...rowLayout}>
          <WarehouseTransferComponent warehouseRef={transferRef} />

          <Col {...largeLayout}>
            <TransferDateComponent />
          </Col>
          <Col {...largeLayout}>
            <FileStatusComponent />
          </Col>

          <CustomTransferProductComponent
            onCustomSubmit={handleProducts}
            data={data}
            ref={transferRef}
          >
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
          </CustomTransferProductComponent>
        </Row>
      </CustomForm>

      {/* <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        // taxRate={tax_rate}
        // discount={discount}
        shippingCost={shipping_cost ?? 0}
        grandTotal={grandTotal}
      /> */}
    </>
  );
};

export default TransferForm;
