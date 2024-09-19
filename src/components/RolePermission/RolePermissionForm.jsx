import { Col, Row } from 'antd';

import { fullColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';

const RolePermissionForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Department Name"
            type={'text'}
            required={true}
            name={'name'}
            placeholder={'Department Name'}
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default RolePermissionForm;
