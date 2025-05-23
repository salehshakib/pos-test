import { Col, Row } from 'antd';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useGetWarehousesQuery } from '../../redux/services/warehouse/warehouseApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomForm from '../Shared/Form/CustomForm';
import CustomSelect from '../Shared/Select/CustomSelect';
import PartialForm from './PartialForm';

const options = [
  {
    // full
    value: 'Full',
    label: 'Full',
  },
  {
    // partial
    value: 'Partial',
    label: 'Partial',
  },
];

const StockCountForm = (props) => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetWarehousesQuery({
    params,
  });

  const warehouseOptions = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Warehouse"
            type={'text'}
            required={true}
            options={warehouseOptions}
            isLoading={isLoading}
            showSearch={true}
            mode="multiple"
            name="warehouse_ids"
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Type"
            options={options}
            name={'type'}
            required={true}
          />
        </Col>

        <PartialForm />
      </Row>
    </CustomForm>
  );
};

export default StockCountForm;
