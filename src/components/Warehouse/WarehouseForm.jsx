import { Col, Row } from 'antd';

import { colLayout, fullColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';

const PhoneNumberComponent = () => {
  return (
    <CustomInput
      label="Phone Number"
      type={'phone'}
      required={true}
      name={'phone'}
      placeholder={'Phone Number'}
      noStyle={false}
    />
  );
};

const WarehouseForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Warehouse Name"
            type={'text'}
            required={true}
            name={'name'}
          />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            label="Email"
            type={'email'}
            name={'email'}
            placeholder={'Email Address'}
            required={true}
          />
        </Col>
        <Col {...colLayout}>
          <PhoneNumberComponent />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Address"
            type={'textarea'}
            required={true}
            name={'address'}
            placeholder={'Address'}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default WarehouseForm;
