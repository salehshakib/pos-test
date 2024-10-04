import { Col, Row } from 'antd';

import { fullColLayout, mdColLayout, rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import CustomInput from '../Shared/Input/CustomInput';

const PettyCashRequestForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...mdColLayout}>
          <CustomInput
            label="Requested By"
            type={'text'}
            name={'requested_by'}
            required
          />
        </Col>
        <Col {...mdColLayout}>
          <CustomInput label="Amount" type={'text'} name={'amount'} required />
        </Col>
        <Col {...fullColLayout}>
          <CustomInput
            label="Reason"
            type={'textarea'}
            name={'reason'}
            required
          />
        </Col>
      </Row>
    </CustomForm>
  );
};

export default PettyCashRequestForm;
