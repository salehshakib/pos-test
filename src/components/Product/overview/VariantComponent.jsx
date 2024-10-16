import { Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';

import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import { useGetAllVariantsQuery } from '../../../redux/services/variant/variantApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { openNotification } from '../../../utilities/lib/openToaster';
import {
  extractAttributeValues,
  formatVariantsData,
  generateCombinationsFromVariantAttributes,
} from '../../../utilities/lib/product/variant';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import { CreateVariantAttribute } from './variant/CreateVariantAttribute';
import ProductVariantOption from './variant/ProductVariantOptions';
import { VariantAttributeTable } from './variant/VariantAttributeTable';

const VariantAttributes = ({ onCustomSubmit, data: editData }) => {
  const params = useGlobalParams({
    isRelationalParams: true,
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const form = Form.useFormInstance();

  const { data, isLoading } = useGetAllVariantsQuery({ params });

  const options =
    data?.results?.attribute?.map((item) => ({
      value: item.id.toString(),
      label: item.name,
      attribute_options: item.attribute_options,
    })) ?? [];

  const [dataSource, setDataSource] = useState([]);

  const [variantOptions, setVariantOptions] = useState({});
  const [variantAttributesName, setVariantAttributesName] = useState({});

  const onSelect = (value, option) => {
    const selected =
      option.map((item) => {
        return {
          key: item.value,
          id: item.value,
          name: item.label,
          options: item.attribute_options,
        };
      }) ?? [];

    setDataSource(selected);
  };

  const attributes = data?.results?.attribute;

  useEffect(() => {
    if (editData && attributes) {
      const options = formatVariantsData(
        editData?.variants,
        attributes,
        editData?.name
      );

      const variantAttributes = form.getFieldValue('attribute_ids');

      const sortedDataSource = options.sort((a, b) => {
        return (
          variantAttributes.indexOf(a.id) - variantAttributes.indexOf(b.id)
        );
      });

      setDataSource(sortedDataSource);

      const result = extractAttributeValues(editData?.variants);

      setVariantOptions(result.attributeIds);
      setVariantAttributesName(result.attributeValues);
    }
  }, [editData, attributes, form]);

  const mainForm = Form.useFormInstance();

  const { buying_price, selling_price } = mainForm.getFieldsValue([
    'buying_price',
    'selling_price',
  ]);

  const combination = generateCombinationsFromVariantAttributes(
    dataSource,
    variantAttributesName,
    buying_price,
    selling_price
  );

  const [reset, setReset] = useState(false);
  // console.log(reset);

  return (
    <>
      <CreateVariantAttribute
        options={options}
        isLoading={isLoading}
        onSelect={onSelect}
      />

      <VariantAttributeTable
        dataSource={dataSource}
        setDataSource={setDataSource}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
        variantAttributesName={variantAttributesName}
        setVariantAttributesName={setVariantAttributesName}
        setReset={setReset}
      />

      <ProductVariantOption
        combination={combination}
        onCustomSubmit={onCustomSubmit}
        data={editData}
        reset={reset}
      />
    </>
  );
};

export const VariantComponent = ({ onCustomSubmit, data }) => {
  const form = Form.useFormInstance();

  const has_variant = Form.useWatch('has_variant', form);
  const productType = Form.useWatch('type', form);

  const onChange = (e) => {
    const { checked } = e.target;
    if (!checked) {
      form.setFieldValue('attribute_ids', []);
    }

    if (checked) {
      if (!form.getFieldValue('product_price')) {
        form.setFieldValue('has_variant', false);
        openNotification('info', 'Please enter product price');
        return;
      }
      if (!form.getFieldValue('selling_price')) {
        form.setFieldValue('has_variant', false);
        openNotification('info', 'Please enter selling price');
        return;
      }
    }
  };

  if (productType === 'Standard')
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This Product has variant"
            name="has_variant"
            onChange={onChange}
          />
        </Col>

        {has_variant && (
          <>
            <Col {...fullColLayout}>
              <VariantAttributes onCustomSubmit={onCustomSubmit} data={data} />
            </Col>
          </>
        )}
      </Row>
    );
  else return null;
};
