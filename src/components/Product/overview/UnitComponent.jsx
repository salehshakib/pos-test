import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { colLayout } from '../../../layout/FormLayout';
import { useGetAllUnitQuery } from '../../../redux/services/unit/unitApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../../utilities/hooks/useParams';
import { CustomSelectButton } from '../../Shared/Select/CustomSelectButton';
import UnitCreate from '../../Unit/UnitCreate';

const ProductUnit = ({ options = [], isLoading }) => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <Col {...colLayout}>
      <CustomSelectButton
        label="Product Unit"
        options={options}
        isLoading={isLoading}
        required={'true'}
        name={'unit_id'}
        showSearch={true}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
      />

      <UnitCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />

      {/* <CustomSelect
        label="Product Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={'unit_id'}
        showSearch={true}
      /> */}
    </Col>
  );
};

const PurchaseUnit = ({ options = [], isLoading }) => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  const form = Form.useFormInstance();
  const unit = Form.useWatch('unit_id', form);

  useEffect(() => {
    if (!form.getFieldValue('purchase_unit_id')) {
      form.setFieldsValue({ purchase_unit_id: unit });
    }
  }, [form, unit]);

  return (
    <Col {...colLayout}>
      {/* <CustomSelect
        label="Puchase Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={'purchase_unit_id'}
        showSearch={true}
      /> */}

      <CustomSelectButton
        label="Purchasing Unit"
        options={options}
        isLoading={isLoading}
        required={'true'}
        name={'purchase_unit_id'}
        showSearch={true}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
      />

      <UnitCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </Col>
  );
};

const SaleUnit = ({ options = [], isLoading }) => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  const form = Form.useFormInstance();
  const unit = Form.useWatch('unit_id', form);

  useEffect(() => {
    if (!form.getFieldValue('sale_unit_id')) {
      form.setFieldsValue({ sale_unit_id: unit });
    }
  }, [form, unit]);

  return (
    <Col {...colLayout}>
      <CustomSelectButton
        label="Selling Unit"
        options={options}
        isLoading={isLoading}
        required={'true'}
        name={'sale_unit_id'}
        showSearch={true}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
      />

      <UnitCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </Col>
  );
};

const UnitComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllUnitQuery({
    params,
  });

  const options = data?.results?.unit.map((unit) => ({
    value: unit.id.toString(),
    label: unit.name,
  }));

  if (productType === 'Standard') {
    return (
      <>
        <ProductUnit options={options} isLoading={isLoading} />
        <PurchaseUnit options={options} isLoading={isLoading} />
        <SaleUnit options={options} isLoading={isLoading} />
      </>
    );
  }
};

export default UnitComponent;
