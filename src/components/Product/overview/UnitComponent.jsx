import { Col, Form } from 'antd';

import { colLayout } from '../../../layout/FormLayout';
import { useGetAllUnitQuery } from '../../../redux/services/unit/unitApi';
import { useGlobalParams } from '../../../utilities/hooks/useParams';
import CustomSelect from '../../Shared/Select/CustomSelect';

const ProductUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Product Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={'unit_id'}
        showSearch={true}
      />
    </Col>
  );
};

const PurchaseUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Puchase Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={'purchase_unit_id'}
        showSearch={true}
      />
    </Col>
  );
};

const SaleUnit = ({ options = [], isLoading }) => {
  return (
    <Col {...colLayout}>
      <CustomSelect
        label="Sale Unit"
        options={options}
        isLoading={isLoading}
        required={true}
        name={'sale_unit_id'}
        showSearch={true}
      />
    </Col>
  );
};

const UnitComponent = () => {
  const form = Form.useFormInstance();
  const productType = Form.useWatch('type', form);

  const params = useGlobalParams({
    selectValue: ['name', 'id'],
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
