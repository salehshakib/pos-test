import { Col, Row } from 'antd';
import { useCallback, useRef } from 'react';

import { fullColLayout, rowLayout } from '../../layout/FormLayout';
import CustomCheckbox from '../Shared/Checkbox/CustomCheckbox';
import CustomForm from '../Shared/Form/CustomForm';
import { CustomDifferentPriceComponent } from './customcomponents/CustomDifferentPriceComponent';
import { CustomInititalStockComponent } from './customcomponents/CustomInitialStockComponent';

export const ProductStockForm = ({ data, ...props }) => {
  //   const comboProductSubmitRef = useRef(null);
  const initialStockSubmitRef = useRef(null);
  const diffPriceSubmitRef = useRef(null);

  const handleInitialProduct = useCallback((submitFunction) => {
    initialStockSubmitRef.current = submitFunction;
  }, []);

  const handlediffPriceProduct = useCallback((submitFunction) => {
    diffPriceSubmitRef.current = submitFunction;
  }, []);

  const handleSubmit = (values) => {
    // const comboData = comboProductSubmitRef.current
    //   ? comboProductSubmitRef.current()
    //   : null;

    const initialData = initialStockSubmitRef.current
      ? initialStockSubmitRef.current()
      : null;

    const diffPriceData = diffPriceSubmitRef.current
      ? diffPriceSubmitRef.current()
      : null;

    const formValues = {
      //   product_list: comboData.product_list,
      qty_list: initialData.qty_list,
      price_list: diffPriceData.price_list,
    };

    props.handleSubmit(values, { formValues });
  };

  return (
    <CustomForm {...props} handleSubmit={handleSubmit}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox label="Initial Stock" name="has_stock" />
        </Col>

        <CustomInititalStockComponent
          onCustomSubmit={handleInitialProduct}
          data={data}
        />
      </Row>

      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomCheckbox
            label="This product has different price for different warehouse"
            name="has_different_price"
          />
        </Col>

        <CustomDifferentPriceComponent
          onCustomSubmit={handlediffPriceProduct}
          data={data}
        />
      </Row>
    </CustomForm>
  );
};
