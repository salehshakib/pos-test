import { Col, Form } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { largeLayout, mdColLayout } from '../../layout/FormLayout';
import { useCurrentUser } from '../../redux/services/auth/authSlice';
import { useGetWarehousesQuery } from '../../redux/services/warehouse/warehouseApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomSelect from '../Shared/Select/CustomSelect';

export const WarehouseTransferComponent = ({
  fullLayout = false,
  warehouseRef,
}) => {
  const form = Form.useFormInstance();
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const warehouseFrom = Form.useWatch('from_warehouse_id', form);
  const warehouseTo = Form.useWatch('to_warehouse_id', form);
  const user = useSelector(useCurrentUser);
  const warehouseId = user?.warehouse_id;

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({ params });

  const warehouseFromOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  useEffect(() => {
    if (warehouseId && !warehouseFrom) {
      form.setFieldValue('from_warehouse_id', warehouseId.toString());
    }
  }, [warehouseId, form, warehouseFrom]);

  const warehouseToOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
    disabled: warehouse.id.toString() === warehouseFrom,
  }));

  useEffect(() => {
    if (!isEditDrawerOpen || warehouseFrom === warehouseTo) {
      form.resetFields(['to_warehouse_id']);
    }
  }, [warehouseFrom, form, isEditDrawerOpen, warehouseTo]);

  const handleChange = () => {
    if (warehouseRef && warehouseRef.current) {
      warehouseRef.current.resetFormAndProducts();
    }
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
          onChange={handleChange}
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
        />
      </Col>
    </>
  );
};
