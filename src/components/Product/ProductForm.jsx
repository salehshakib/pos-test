import { Button, Col, Divider, Form, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import { taxTypeOptions } from '../../assets/data/taxType';
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from '../../layout/FormLayout';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { useGetPosSettingsQuery } from '../../redux/services/settings/generalSettings/generalSettingsApi';
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

  const params = {
    child: 1,
  };

  const { data } = useGetPosSettingsQuery(params);

  const options = data?.product_type
    ? JSON.parse(data?.product_type)?.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    : [];

  useEffect(() => {
    if (!productType) {
      form.setFieldValue('type', options?.[0]?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, productType, data]);

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

  const params = {
    child: 1,
  };

  const { data } = useGetPosSettingsQuery(params);

  const options = data?.symbology
    ? [{ value: data?.symbology, label: data?.symbology }]
    : [];

  useEffect(() => {
    if (data) {
      form.setFieldValue('symbology', data?.symbology);
    }
  }, [form, data]);

  return (
    <CustomSelect
      label="Barcode Symbology"
      required={true}
      options={options}
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

const ProductVariantComponent = ({ data, handleVariantProduct }) => {
  const form = Form.useFormInstance();
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);
  const productType = Form.useWatch('type', form);

  if (productType === 'Standard') {
    return (
      <>
        <Row {...rowLayout}>
          <Divider orientation="left" orientationMargin={10}>
            Variant
          </Divider>
        </Row>

        {isEditDrawerOpen ? (
          <>
            {data?.has_variant.toString() === '1' ? (
              <VariantComponent
                onCustomSubmit={handleVariantProduct}
                data={data}
              />
            ) : null}
          </>
        ) : (
          <VariantComponent onCustomSubmit={handleVariantProduct} data={data} />
        )}
      </>
    );
  } else return null;
};

const AlertComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);
  const hasVariant = Form.useWatch('has_variant', form);

  if (productType === 'Standard') {
    return (
      <>
        {!hasVariant && (
          <Col {...colLayout}>
            <CustomInput
              label="Quantity"
              type={'number'}
              required={true}
              name={'qty'}
              tooltip="Ignore this field if product has variant"
            />
          </Col>
        )}
        <Col {...colLayout}>
          <CustomInput
            label="Daily Sale Objectives"
            type={'number'}
            tooltip="Minimum qty which must be sold in a day. If not you will not be notified on dashboard. But you have to set up cron job property for that. Follow the documentation in this regard."
            name={'daily_sale_qty'}
          />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Alert Quantity"
            type={'number'}
            required={true}
            name={'alert_qty'}
          />
        </Col>
      </>
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
      <Row {...rowLayout}>
        <Divider orientation="left" orientationMargin={10}>
          Product Expire
        </Divider>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has batch and expired date"
            name="has_expired_date"
          />
        </Col>
        {hasExpiredDate && (
          <Col {...fullColLayout}>
            <CustomDatepicker
              label={'Expired Date'}
              name={['product_expire', 'expired_date']}
              required={true}
            />
          </Col>
        )}
      </Row>
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
      <Divider orientation="left" orientationMargin={10}>
        Promotional Price
      </Divider>
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
        <Divider orientation="left" orientationMargin={10}>
          Product IEMI
        </Divider>
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

const ProductPurchaseAmount = () => {
  const currency = useSelector(useCurrency);

  return (
    <Col {...colLayout}>
      <CustomInput
        label="Product Purchase Amount"
        type={'number_with_money'}
        suffix={currency?.name}
        disabled={true}
        name={'buying_price'}
      />
    </Col>
  );
};

const ProductSellingAmount = () => {
  const currency = useSelector(useCurrency);
  const form = Form.useFormInstance();

  const profit_margin = Form.useWatch('profit_margin', form);
  const productPrice = Form.useWatch('product_price', form);

  // const taxMethod = Form.useWatch('tax_method', form);

  // console.log(taxMethod);

  useEffect(() => {
    if (profit_margin > 0) {
      const sale_amount =
        parseFloat(productPrice) +
        (parseFloat(productPrice) * parseFloat(profit_margin)) / 100;

      form.setFieldValue('sale_amount', sale_amount);

      const profitAmount = parseFloat(sale_amount) - parseFloat(productPrice);

      form.setFieldValue('profit_amount', profitAmount);
    } else {
      form.setFieldValue('sale_amount', productPrice);

      const profitAmount = 0;
      form.setFieldValue('profit_amount', profitAmount);
    }
  }, [profit_margin, form, productPrice]);

  const onChange = (value) => {
    const sale_amount = parseFloat(value);

    if (!isNaN(sale_amount) && sale_amount > 0) {
      const new_profit_margin =
        ((sale_amount - productPrice) / productPrice) * 100;

      form.setFieldValue('profit_margin', new_profit_margin.toFixed(2));
    }

    const profitAmount = sale_amount - productPrice;
    form.setFieldValue('profit_amount', profitAmount);
  };

  return (
    <>
      <Col {...colLayout}>
        <CustomInput
          label="Profit Margin"
          type={'number_with_percent'}
          required={true}
          name={'profit_margin'}
          suffix={'%'}
          max={9000}
        />
      </Col>

      <Col {...colLayout}>
        <CustomInput
          label="Profit Amount"
          type={'number_with_money'}
          suffix={currency?.name}
          name={'profit_amount'}
          disabled={true}
        />
      </Col>

      <Col {...colLayout}>
        <CustomInput
          label="Product Sell Amount"
          type={'number_with_money'}
          suffix={currency?.name}
          required={true}
          name={'sale_amount'}
          onChange={onChange}
        />
      </Col>

      <Col {...colLayout}>
        <CustomInput
          label="Final Price"
          type={'number_with_money'}
          suffix={currency?.name}
          name={'selling_price'}
          disabled={true}
        />
      </Col>
    </>
  );
};

const ProductForm = ({ data, setIsPrice, ...props }) => {
  const currency = useSelector(useCurrency);

  const comboProductSubmitRef = useRef(null);

  const variantProductRef = useRef(null);

  const handleComboProduct = useCallback((submitFunction) => {
    comboProductSubmitRef.current = submitFunction;
  }, []);

  const handleVariantProduct = useCallback((submitFunction) => {
    variantProductRef.current = submitFunction;
  }, []);

  const handleSubmit = (values) => {
    const comboData = comboProductSubmitRef.current
      ? comboProductSubmitRef.current()
      : null;

    const variantData = variantProductRef.current
      ? variantProductRef.current()
      : null;

    const formValues = {
      product_list: comboData.product_list,
    };

    props.handleSubmit(values, { variantData, formValues });
  };

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  return (
    <CustomForm {...props} handleSubmit={handleSubmit} submitBtn={false}>
      <Row {...rowLayout} className="-mt-6">
        <Divider orientation="left" orientationMargin={10}>
          Product Type
        </Divider>

        <Col {...colLayout}>
          <ProductTypeComponent />
        </Col>

        <Col {...colLayout}>
          <BarCodeComponent />
        </Col>

        <Col {...colLayout}>
          <ProductCodeComponent />
        </Col>

        <Divider orientation="left" orientationMargin={10}>
          Name
        </Divider>

        <Col {...colLayout}>
          <CustomInput
            label="Product Name"
            type={'text'}
            required={true}
            name={'name'}
          />
        </Col>

        <Col {...colLayout}>
          <BrandComponent />
        </Col>

        <Col {...colLayout}>
          <CategoryComponent />
        </Col>

        <CustomProductComponent
          onCustomSubmit={handleComboProduct}
          data={data}
        />

        <AttachmentComponent />

        <Divider orientation="left" orientationMargin={10}>
          Pricing
        </Divider>

        <Col {...colLayout}>
          <CustomInput
            label="Product Buying Cost"
            type={'number_with_money'}
            suffix={currency?.name}
            required={true}
            name={'product_price'}
          />
        </Col>
        <Col {...colLayout}>
          <TaxComponent />
        </Col>
        <Col {...colLayout}>
          <TaxTypeComponent />
        </Col>

        <ProductPurchaseAmount />

        <ProductSellingAmount />

        <UnitComponent />

        <AlertComponent />
      </Row>

      <ProductVariantComponent
        data={data}
        handleVariantProduct={handleVariantProduct}
      />

      <IMEIComponent />

      <ExpireComponent />

      <PromotionalPriceComponent />

      <Row {...rowLayout} justify={'center'} align={'middle'}>
        <Divider orientation="left" orientationMargin={10}>
          Attachment
        </Divider>
        <Col xs={24} className="-mt-6">
          <CustomUploader name={'attachments'} multiple={true} type="img" />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Divider orientation="left" orientationMargin={10}>
          Product Details
        </Divider>
        <Col {...fullColLayout}>
          <RichTextEditor name="details" />
        </Col>
      </Row>

      <div className={`flex w-full items-center justify-end gap-3 pt-5 pb-20`}>
        <Button type="default" onClick={props.handleDrawerClose}>
          Cancel
        </Button>
        {!isEditDrawerOpen && (
          <Button
            htmlType="submit"
            onClick={() => setIsPrice(true)}
            type="primary"
            loading={props.isLoading}
          >
            Save & Add Price
          </Button>
        )}
        <Button
          htmlType="submit"
          onClick={() => setIsPrice(false)}
          type="primary"
          loading={props.isLoading}
        >
          Save
        </Button>
      </div>
    </CustomForm>
  );
};

export default ProductForm;
