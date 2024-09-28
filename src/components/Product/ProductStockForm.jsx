import { Row, Tabs } from 'antd';
import { useCallback, useRef } from 'react';

import { rowLayout } from '../../layout/FormLayout';
import CustomForm from '../Shared/Form/CustomForm';
import { CustomDifferentPriceComponent } from './customcomponents/CustomDifferentPriceComponent';
import { CustomInititalStockComponent } from './customcomponents/CustomInitialStockComponent';

export const ProductStockForm = ({ data, ...props }) => {
  const initialStockSubmitRef = useRef(null);
  const diffPriceSubmitRef = useRef(null);

  const handleInitialProduct = useCallback((submitFunction) => {
    initialStockSubmitRef.current = submitFunction;
  }, []);

  const handlediffPriceProduct = useCallback((submitFunction) => {
    diffPriceSubmitRef.current = submitFunction;
  }, []);

  const handleSubmit = (values) => {
    const initialData = initialStockSubmitRef.current
      ? initialStockSubmitRef.current()
      : null;

    const diffPriceData = diffPriceSubmitRef.current
      ? diffPriceSubmitRef.current()
      : null;

    const formValues = {
      stock_list: initialData.stock_list,
      price_list: diffPriceData.price_list,
    };

    props.handleSubmit(values, { formValues });
  };

  console.log(data);

  return (
    <CustomForm {...props} handleSubmit={handleSubmit}>
      <Tabs
        defaultActiveKey="stock"
        className="-mt-4"
        items={[
          {
            key: 'stock',
            label: 'Initial Stock',
            children: (
              <Row {...rowLayout}>
                <CustomInititalStockComponent
                  productId={props.productId}
                  onCustomSubmit={handleInitialProduct}
                  data={data}
                />
              </Row>
            ),
          },
          {
            key: 'price',
            label: 'Different Price',
            children: (
              <Row {...rowLayout}>
                <CustomDifferentPriceComponent
                  productId={props.productId}
                  onCustomSubmit={handlediffPriceProduct}
                  data={data}
                />
              </Row>
            ),
          },
        ]}
      />
    </CustomForm>
  );
};
