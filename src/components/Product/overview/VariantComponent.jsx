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

import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import { useGetAllVariantsQuery } from '../../../redux/services/variant/variantApi';
import { useGlobalParams } from '../../../utilities/hooks/useParams';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';
import CustomSelect from '../../Shared/Select/CustomSelect';
import CustomTable from '../../Shared/Table/CustomTable';

const updateVariantOptions = (
  dataSource,
  variantOptions,
  variantAttributes
) => {
  const validIds = dataSource.map((item) => item.id.toString());

  Object.keys(variantOptions).forEach((id) => {
    if (!validIds.includes(id.toString())) {
      variantOptions[id] = [];
      variantAttributes[id] = [];
    }
  });
};

const generateCombinationsFromVariantAttributes = (
  dataSource,
  variantAttributes
) => {
  // Create an ordered array of attribute ids from dataSource
  const orderedAttributeIds = dataSource.map((item) => item.id);
  const combinations = [];

  const combine = (index, current) => {
    // If the current combination is the same length as the ordered attribute ids, add to results
    if (index === orderedAttributeIds.length) {
      combinations.push(current.join('-'));
      return;
    }

    const key = orderedAttributeIds[index];
    const values = variantAttributes[key]; // Get values for the current key

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

const VariantAttributeTable = ({
  dataSource,
  setDataSource,
  variantOptions,
  variantAttributes,
  setVariantOptions,
  setVariantAttributes,
}) => {
  const RowContext = React.createContext({});
  const onSelect = (value, option, id) => {
    setVariantOptions((prev) => ({
      ...prev,
      [id]: value,
    }));

    setVariantAttributes((prev) => ({
      ...prev,
      [id]: option.map((item) => item.label),
    }));
  };

  useEffect(() => {
    updateVariantOptions(dataSource, variantOptions, variantAttributes);
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
        const attribute_options = options.map((item) => {
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

const VariantAttributes = () => {
  const params = useGlobalParams({
    isRelationalParams: true,
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
  const [variantAttributes, setVariantAttributes] = useState({});

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

  console.log(dataSource, variantAttributes);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <span className="text-dark dark:text-white87 text-xs md:text-sm">
          {name}
        </span>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      // render: (sku) => (
      //   <div className="flex items-center">
      //     <span className="text-[14px] text-lg font-semibold underline">
    },
  ];

  const combination = generateCombinationsFromVariantAttributes(
    dataSource,
    variantAttributes
  );

  // console.log(first)

  const variantDatasource = combination.map((item) => {
    return {
      key: item,
      name: item,
    };
  });

  return (
    <>
      <CustomSelect
        label={'Variant Attributes'}
        options={options}
        isLoading={isLoading}
        name={'attribute_ids'}
        mode="multiple"
        onChange={(value, option) => onSelect(value, option)}
      />

      <VariantAttributeTable
        dataSource={dataSource}
        setDataSource={setDataSource}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
        variantAttributes={variantAttributes}
        setVariantAttributes={setVariantAttributes}
      />

      <CustomTable
        title={'Product Variant Options'}
        pagination={false}
        dataSource={variantDatasource}
        columns={columns}
        status={false}
        created_at={false}
      />
    </>
  );
};

export const VariantComponent = () => {
  const form = Form.useFormInstance();

  const has_variant = Form.useWatch('has_variant', form);
  const productType = Form.useWatch('type', form);

  useEffect(() => {
    if (!has_variant) {
      form.setFieldValue('attribute_ids', []);
    }
  }, [has_variant, form]);

  if (productType === 'Standard')
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox label="This Product has varient" name="has_variant" />
        </Col>

        {has_variant && (
          <>
            <Col {...fullColLayout}>
              <VariantAttributes />
            </Col>
          </>
        )}
      </Row>
    );
  else return null;
};
