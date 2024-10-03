import { Col, Row } from 'antd';

import { fullColLayout, rowLayout } from '../../layout/FormLayout';
import { useGetAllVariantOptionsQuery } from '../../redux/services/variant/variantApi';
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from '../../utilities/hooks/useParams';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';

const VariantOptions = () => {
  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });
  const { data, isLoading } = useGetAllVariantOptionsQuery({ params });

  const options =
    data?.map((item) => {
      return {
        value: item?.name,
        label: item?.name,
      };
    }) ?? [];

  return (
    <Col {...fullColLayout} className="mb-2">
      <CustomSelect
        label={'Attribute Options'}
        mode="tags"
        options={options}
        name={'options'}
        isLoading={isLoading}
      />
    </Col>
  );
};

export const VariantForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Attribute Name"
            type={'text'}
            required={true}
            name={'name'}
          />
        </Col>

        <VariantOptions />
      </Row>
    </CustomForm>
  );
};
