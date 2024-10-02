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
            label={'Type'}
            placeholder="Type"
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
          <CustomInput label="Name" type={'text'} name={'name'} />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="Number" type={'text'} name={'number'} />
        </Col>
        {typeData === 'Bank' && (
          <Col {...mdColLayout}>
            <CustomInput label="Branch" type={'text'} name={'branch'} />
          </Col>
        )}
      </Row>
    </CustomForm>
  );
};

export default AccountForm;
