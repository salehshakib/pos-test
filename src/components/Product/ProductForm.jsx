import { Col, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { RiRefreshLine } from 'react-icons/ri';

import { barcodeOptions } from '../../assets/data/barcode';
import { taxTypeOptions } from '../../assets/data/taxType';
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { disabledDate } from '../../utilities/lib/currentDate';
import { generateRandomCode } from '../../utilities/lib/generateCode';
import CustomCheckbox from '../Shared/Checkbox/CustomCheckbox';
import CustomDatepicker from '../Shared/DatePicker/CustomDatepicker';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomInputButton from '../Shared/Input/CustomInputButton';
import CustomSelect from '../Shared/Select/CustomSelect';
import RichTextEditor from '../Shared/TextEditor/RichTextEditor';
import CustomUploader from '../Shared/Upload/CustomUploader';
import { CustomProductComponent } from './customcomponents/CustomProductComponent';
import { BrandComponent } from './overview/BrandComponent';
import { CategoryComponent } from './overview/CategoryComponent';
import { TaxComponent } from './overview/TaxComponent';
import UnitComponent from './overview/UnitComponent';
import { VariantComponent } from './overview/VariantComponent';

const ProductTypeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  const options = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Combo', label: 'Combo' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Service', label: 'Service' },
  ];

  useEffect(() => {
    if (!productType) {
      form.setFieldValue('type', 'Standard');
    }
  }, [form, productType]);

  return (
    <CustomSelect
      label="Product Type"
      required={true}
      options={options}
      name={'type'}
    />
  );
};

const ProductCodeComponent = () => {
  const form = Form.useFormInstance();

  const generate = () => {
    const randomCode = generateRandomCode(6);

    form?.setFieldValue('sku', randomCode);
  };

  return (
    <CustomInputButton
      label="SKU"
      type={'text'}
      required={true}
      name={'sku'}
      placeholder={'Generate Sku'}
      onClick={generate}
      icon={<RiRefreshLine className="text-xl" />}
    />
  );
};

const BarCodeComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  useEffect(() => {
    if (!productType) {
      form.setFieldValue('symbology', barcodeOptions[0].value);
    }
  }, [form, productType]);

  return (
    <CustomSelect
      label="Barcode Symbology"
      options={barcodeOptions}
      required={true}
      name={'symbology'}
    />
  );
};

const AttachmentComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  if (productType === 'Digital')
    return (
      <Col {...fullColLayout}>
        <CustomUploader
          label={'Attachment'}
          name={'attach_file'}
          required={true}
        />
      </Col>
    );

  return null;
};

const ProductCostComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  if (productType === 'Standard')
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Product Buying Cost"
          type={'number'}
          required={true}
          name={'buying_price'}
        />
      </Col>
    );
};

const AlertComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  if (productType === 'Standard') {
    return (
      <Col {...colLayout}>
        <CustomInput
          label="Alert Quantity"
          type={'number'}
          // required={true}
          name={'alert_qty'}
        />
      </Col>
    );
  }
};

const TaxTypeComponent = () => {
  const form = Form.useFormInstance();

  return (
    <CustomSelect
      label="VAT Method"
      options={taxTypeOptions}
      name={'tax_method'}
      required={Form.useWatch('tax_id', form) ? true : false}
    />
  );
};

const ExpireComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);
  const hasExpiredDate = Form.useWatch('has_expired_date', form);

  if (productType === 'Standard') {
    return (
      <>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has batch and expired date"
            name="has_expired_date"
          />
        </Col>
        {hasExpiredDate && (
          <Col {...mdColLayout}>
            <CustomDatepicker
              label={'Expired Date'}
              name={['product_expire', 'expired_date']}
              required={true}
            />
          </Col>
        )}
      </>
    );
  } else return null;
};

const PromotionalPriceComponent = () => {
  const form = Form.useFormInstance();
  const hasPromotionalPrice = Form.useWatch('has_promotion', form);

  const start_date = Form.useWatch(['promotion', 'starting_date'], form);

  const disabledDateStart = (current) => {
    return disabledDate(current, start_date);
  };

  return (
    <Row {...rowLayout}>
      <Col {...fullColLayout}>
        <CustomCheckbox label="Add Promotional Price" name="has_promotion" />
      </Col>

      {hasPromotionalPrice && (
        <>
          <Col {...mdColLayout}>
            <CustomInput
              label="Promotional Price"
              name={['promotion', 'promotion_price']}
              type={'number'}
              required={true}
            />
          </Col>
          <Col {...mdColLayout}>
            <Row {...rowLayout}>
              <Col {...mdColLayout}>
                <CustomDatepicker
                  type={'date'}
                  label={'Start Date'}
                  name={['promotion', 'starting_date']}
                  required={true}
                  disabledDate={disabledDate}
                />
              </Col>
              <Col {...mdColLayout}>
                <CustomDatepicker
                  type={'date'}
                  label={'End Date'}
                  name={['promotion', 'last_date']}
                  required={true}
                  disabledDate={disabledDateStart}
                />
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

const IMEIComponent = () => {
  const form = Form.useFormInstance();
  const has_imei = Form.useWatch('has_imei_serial', form);
  const productType = Form.useWatch('type', form);

  if (productType === 'Standard')
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label=" This product has IMEI or Serial numbers"
            name="has_imei_serial"
          />
        </Col>

        {has_imei && (
          <Col {...fullColLayout}>
            <CustomInput
              label="IMEI Serial Number"
              type={'text'}
              required={true}
              name={'imei_number'}
            />
          </Col>
        )}
      </Row>
    );
  else return null;
};

const ProductForm = ({ data, ...props }) => {
  const comboProductSubmitRef = useRef(null);
  // const initialStockSubmitRef = useRef(null);
  // const diffPriceSubmitRef = useRef(null);

  const handleComboProduct = useCallback((submitFunction) => {
    comboProductSubmitRef.current = submitFunction;
  }, []);

  // const handleInitialProduct = useCallback((submitFunction) => {
  //   initialStockSubmitRef.current = submitFunction;
  // }, []);

  // const handlediffPriceProduct = useCallback((submitFunction) => {
  //   diffPriceSubmitRef.current = submitFunction;
  // }, []);

  const handleSubmit = (values) => {
    const comboData = comboProductSubmitRef.current
      ? comboProductSubmitRef.current()
      : null;

    // const initialData = initialStockSubmitRef.current
    //   ? initialStockSubmitRef.current()
    //   : null;

    // const diffPriceData = diffPriceSubmitRef.current
    //   ? diffPriceSubmitRef.current()
    //   : null;

    const formValues = {
      product_list: comboData.product_list,
      // qty_list: initialData.qty_list,
      // price_list: diffPriceData.price_list,
    };

    props.handleSubmit(values, { formValues });
  };

  return (
    <CustomForm {...props} handleSubmit={handleSubmit}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <ProductTypeComponent />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Product Name"
            type={'text'}
            required={true}
            name={'name'}
          />
        </Col>
        <Col {...colLayout}>
          <ProductCodeComponent />
        </Col>
        <Col {...colLayout}>
          <BarCodeComponent />
        </Col>

        <CustomProductComponent
          onCustomSubmit={handleComboProduct}
          data={data}
        />

        <AttachmentComponent />

        <Col {...colLayout}>
          <BrandComponent />
        </Col>
        <Col {...colLayout}>
          <CategoryComponent />
        </Col>
        <UnitComponent />
        <ProductCostComponent />
        <Col {...colLayout}>
          <CustomInput
            label="Product Selling Price"
            type={'number'}
            required={true}
            name={'selling_price'}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Daily Sale Objectives"
            type={'number'}
            tooltip="Minimum qty which must be sold in a day. If not you will not be notified on dashboard. But you have to set up cron job property for that. Follow the documentation in this regard."
            name={'daily_sale_qty'}
          />
        </Col>
        <AlertComponent />
        <Col {...colLayout}>
          <TaxComponent />
        </Col>
        <Col {...colLayout}>
          <TaxTypeComponent />
        </Col>
      </Row>

      {/* <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox label="Initial Stock" name="has_stock" />
        </Col>

        <CustomInititalStockComponent
          onCustomSubmit={handleInitialProduct}
          data={data}
        />
      </Row> */}

      <Row {...rowLayout} justify={'center'} align={'middle'}>
        <Col xs={24}>
          <CustomUploader
            label={'Attachment'}
            name={'attachments'}
            multiple={true}
            required={true}
            type="img"
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <RichTextEditor
            label="Product Details"
            name="details"
            required={true}
          />
        </Col>
      </Row>

      <VariantComponent />

      {/* <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has different price for different warehouse"
            name="has_different_price"
          />
        </Col>

        <CustomDifferentPriceComponent
          onCustomSubmit={handlediffPriceProduct}
          data={data}
        />
      </Row> */}

      <IMEIComponent />

      <Row {...rowLayout}>
        <ExpireComponent />
      </Row>

      <PromotionalPriceComponent />
    </CustomForm>
  );
};

export default ProductForm;
