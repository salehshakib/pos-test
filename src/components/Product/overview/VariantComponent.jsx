import { Col, Form, Row } from 'antd';

import { fullColLayout, rowLayout } from '../../../layout/FormLayout';
import CustomCheckbox from '../../Shared/Checkbox/CustomCheckbox';

export const VariantComponent = () => {
  const form = Form.useFormInstance();

  const has_variant = Form.useWatch('has_variant', form);
  const productType = Form.useWatch('type', form);

  if (productType === 'Standard')
    return (
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox label="This Product has varient" name="has_variant" />
        </Col>

        {has_variant && <Col {...fullColLayout}>i need info</Col>}
      </Row>
    );
  else return null;
};
