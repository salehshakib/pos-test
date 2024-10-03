import { Col, Row } from 'antd';

import { fullColLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import { useGetAllVariantsQuery } from '../../redux/services/variant/variantApi';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';
import CustomUploader from '../Shared/Upload/CustomUploader';

const AttributeOptionForm = (props) => {
  const { data, isLoading } = useGetAllVariantsQuery({});

  const options = data?.results?.attribute?.map((item) => ({
    value: item.id?.toString(),
    label: item.name,
  }));

  // const typeData = Form.useWatch('type', props.form);

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomSelect
            label="Attribute"
            required={true}
            options={options}
            isLoading={isLoading}
            showSearch={true}
            name="attribute_id"
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Attribute Option Name"
            type={'text'}
            name={'name'}
            required
          />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput label="Label" type={'text'} name={'label'} />
        </Col>

        <Col {...fullColLayout}>
          <CustomUploader label={'Attachment'} name={'attachment'} />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default AttributeOptionForm;
