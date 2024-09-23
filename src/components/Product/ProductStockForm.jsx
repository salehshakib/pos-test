import { Row, Tabs } from 'antd';
import { useCallback, useRef } from 'react';

import { rowLayout } from '../../layout/FormLayout';
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
