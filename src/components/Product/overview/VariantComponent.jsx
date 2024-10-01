import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Col, Form, Row, Table } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import { useGetAllVariantsQuery } from '../../../redux/services/variant/variantApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { generateRandomCode } from '../../../utilities/lib/generateCode';
import { openNotification } from '../../../utilities/lib/openToaster';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import CustomSelect from '../../Shared/Select/CustomSelect';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';
import { VariantCreate } from '../../Variant/VariantCreate';
import ProductVariantOption from './variant/ProductVariantOptions';

const updateVariantOptions = (
  dataSource,
  variantOptions,
  variantAttributesName
) => {
  const validIds = dataSource.map((item) => item?.id?.toString());

  Object.keys(variantOptions).forEach((id) => {
    if (!validIds.includes(id.toString())) {
      variantOptions[id] = [];
      variantAttributesName[id] = [];
    }
  });
};

const generateCombinationsFromVariantAttributes = (
  dataSource,
  variantAttributesName,
  buying_price,
  selling_price
) => {
  // Return an empty array if dataSource or variantAttributesName is empty
  if (
    !dataSource.length ||
    Object.keys(variantAttributesName).length === 0 ||
    Object.values(variantAttributesName).every((values) => values.length === 0)
  ) {
    return [];
  }

  // Create an ordered array of attribute ids from dataSource
  const orderedAttributeIds = dataSource.map((item) => item.id);
  const orderedAttributesOptions = dataSource.map((item) => item.options);

  console.log(dataSource);

  const combinations = [];

  const combine = (index, current) => {
    // If the current combination is the same length as the ordered attribute ids, add to results
    if (index === orderedAttributeIds.length) {
      const combinationName = current.join(' ');
      combinations.push({
        name: combinationName,
        cost: buying_price, // Set cost for the combination
        price: selling_price, // Set price for the combination
        sku: generateRandomCode(6), // Generate a random SKU
        variant_options: orderedAttributesOptions,
      });
      return;
    }

    const key = orderedAttributeIds[index];
    const values = variantAttributesName[key]; // Get values for the current key

    // Check if there are values for the current key
    if (values && values.length > 0) {
      for (const value of values) {
        current.push(value); // Add current value to combination
        combine(index + 1, current); // Move to the next key
        current.pop(); // Backtrack to try another value
      }
    } else {
      // If no values, just move to the next key
      combine(index + 1, current);
    }
  };

  combine(0, []);
  return combinations;
};

function formatVariantsData(variants, attributes) {
  const attributesMap = {};

  variants?.forEach((variant) => {
    variant?.product_variant_attribute_options?.forEach((option) => {
      const { attribute_id, attribute } = option.attribute_option;

      if (!attributesMap?.[attribute_id]) {
        attributesMap[attribute_id] = {
          key: attribute_id.toString(),
          id: attribute_id.toString(),
          name: attribute?.name,
          options: attributes?.find(
            (item) => item.id.toString() === attribute_id.toString()
          ).attribute_options,
        };
      }
    });
  });

  return Object.values(attributesMap).reverse();
}

// function extractAttributeValues(attributeData) {
//   const attributeValues = {};
//   const attributeIds = {};

//   attributeData.forEach((product) => {
//     product.product_variant_attribute_options.forEach((variant) => {
//       const attributeId = variant.attribute_option.attribute_id;
//       const attributeName = variant.attribute_option.name;
//       const optionId = variant.attribute_option.id.toString();
//       if (!attributeValues[attributeId]) {
//         attributeValues[attributeId] = [];
//       }
//       if (!attributeValues[attributeId].includes(attributeName)) {
//         attributeValues[attributeId].push(attributeName);
//       }

//       if (!attributeIds[attributeId]) {
//         attributeIds[attributeId] = new Set();
//       }
//       attributeIds[attributeId].add(optionId);
//     });
//   });

//   // Convert Sets back to arrays
//   for (const key in attributeIds) {
//     attributeIds[key] = Array.from(attributeIds[key]);
//   }

//   return { attributeValues, attributeIds };
// }
function extractAttributeValues(attributeData) {
  const attributeValues = {};
  const attributeIds = {};

  attributeData.forEach((product) => {
    product.product_variant_attribute_options.forEach((variant) => {
      const attributeId = variant.attribute_option.attribute_id;
      const attributeName = variant.attribute_option.name;
      const optionId = variant.attribute_option.id.toString();

      // Add attribute value to the values object
      if (!attributeValues[attributeId]) {
        attributeValues[attributeId] = [];
      }
      if (!attributeValues[attributeId].includes(attributeName)) {
        attributeValues[attributeId].push(attributeName);
      }

      // Add attribute option ID to the IDs object
      if (!attributeIds[attributeId]) {
        attributeIds[attributeId] = [];
      }
      if (!attributeIds[attributeId].includes(optionId)) {
        attributeIds[attributeId].push(optionId);
      }
    });
  });

  return { attributeValues, attributeIds };
}

const VariantAttributeTable = ({
  dataSource,
  setDataSource,
  variantOptions,
  variantAttributesName,
  setVariantOptions,
  setVariantAttributesName,
}) => {
  const RowContext = React.createContext({});
  const onSelect = (value, option, id) => {
    setVariantOptions((prev) => ({
      ...prev,
      [id]: value,
    }));

    setVariantAttributesName((prev) => ({
      ...prev,
      [id]: option.map((item) => item.label),
    }));
  };

  useEffect(() => {
    updateVariantOptions(dataSource, variantOptions, variantAttributesName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  const variantAttributeColumns = [
    {
      key: 'sort',
      align: 'center',
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 130,
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      align: 'center',
      render: (options, record) => {
        const attribute_options = options?.map((item) => {
          return {
            value: item.id.toString(),
            label: item.name,
          };
        });

        return (
          <CustomSelect
            mode="multiple"
            options={attribute_options}
            placeholder="Attributes Options"
            customStyle={true}
            onChange={(value, option) => onSelect(value, option, record.id)}
            value={variantOptions[record.id] ?? []}
          />
        );
      },
    },
  ];

  const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{
          cursor: 'move',
        }}
        ref={setActivatorNodeRef}
        {...listeners}
      />
    );
  };

  const Row = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
          }
        : {}),
    };
    const contextValue = useMemo(
      () => ({
        setActivatorNodeRef,
        listeners,
      }),
      [setActivatorNodeRef, listeners]
    );
    return (
      <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
      </RowContext.Provider>
    );
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          rowKey="key"
          components={{
            body: {
              row: Row,
            },
          }}
          size="small"
          pagination={false}
          columns={variantAttributeColumns}
          dataSource={dataSource}
          className="mb-5"
        />
      </SortableContext>
    </DndContext>
  );
};

const CreateVariantAttribute = ({ options, isLoading, onSelect }) => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        label={'Variant Attributes'}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        isLoading={isLoading}
        name={'attribute_ids'}
        mode="multiple"
        onChange={(value, option) => onSelect(value, option)}
        required={'true'}
      />

      <VariantCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};

const VariantAttributes = ({ onCustomSubmit, data: editData }) => {
  const params = useGlobalParams({
    isRelationalParams: true,
    selectValue: DEFAULT_SELECT_VALUES,
  });

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
      console.log(attributes);

      console.log(editData?.variants);
      const options = formatVariantsData(editData?.variants, attributes);

      const result = extractAttributeValues(editData?.variants);

      console.log(result);

      console.log(options);

      setVariantOptions(result.attributeIds);
      setVariantAttributesName(result.attributeValues);

      setDataSource(options);
    }
  }, [editData, attributes]);

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
      />

      <ProductVariantOption
        combination={combination}
        onCustomSubmit={onCustomSubmit}
        data={editData}
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
      if (!form.getFieldValue('buying_price')) {
        form.setFieldValue('has_variant', false);
        openNotification('info', 'Please enter buying price');
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
            label="This Product has varient"
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
