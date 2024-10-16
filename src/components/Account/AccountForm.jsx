import { Col, Form, Row } from 'antd';

import { mdColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';
import CustomSelect from '../Shared/Select/CustomSelect';

const AccountForm = (props) => {
  const typeData = Form.useWatch('type', props.form);

  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomSelect
            name={'type'}
            label={'Account Type'}
            placeholder="Type"
            required
            options={[
              {
                value: 'Bank',
                label: 'Bank',
              },
              {
                value: 'Mobile Banking',
                label: 'Mobile Banking',
              },
              {
                value: 'Cash',
                label: 'Cash',
              },
            ]}
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Account Name"
            type={'text'}
            name={'name'}
            required
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput
            label="Account Number"
            type={'text'}
            name={'number'}
            required
          />
        </Col>
        {typeData === 'Bank' && (
          <Col {...mdColLayout}>
            <CustomInput
              label="Account Branch"
              type={'text'}
              name={'branch'}
              required
            />
          </Col>
        )}
      </Row>
    </CustomForm>
  );
};

export default AccountForm;
