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
import { Button, Table } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';

import { updateVariantOptions } from '../../../../utilities/lib/product/variant';
import CustomSelect from '../../../Shared/Select/CustomSelect';

export const VariantAttributeTable = ({
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
