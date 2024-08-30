import { Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { InitialStockComponent } from '../overview/InitialStockComponent';

const updateStateWithProductData = (productQties, setFormValues) => {
  const qtyList = {};

  productQties.forEach((item) => {
    qtyList[item.warehouse_id.toString()] = item.qty;
  });

  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    qty_list: {
      ...prevFormValues.qty_list,
      qty: qtyList,
    },
  }));
};

export const CustomInititalStockComponent = ({ onCustomSubmit, data }) => {
  const form = Form.useFormInstance();
  const hasStock = Form.useWatch('has_stock', form);
  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const [formValues, setFormValues] = useState({
    qty_list: {
      qty: {},
    },
  });

  const [initialWarehouses, setInitialWarehouses] = useState([]);

  const handleCustomSubmit = useCallback(() => {
    return formValues;
  }, [formValues]);

  onCustomSubmit(handleCustomSubmit);

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      updateStateWithProductData(data?.product_qties, setFormValues);

      const initialWarehousesList = data?.product_qties?.map((item) => ({
        id: item.warehouse_id,
        name: item?.warehouses?.name ?? 'Not Specified',
      }));

      setInitialWarehouses(initialWarehousesList);
    } else {
      setInitialWarehouses([]);
      setFormValues({
        qty_list: {
          qty: {},
        },
      });
    }
  }, [data, isEditDrawerOpen]);

  if (hasStock)
    return (
      <InitialStockComponent
        initialWarehouses={initialWarehouses}
        setInitialWarehouses={setInitialWarehouses}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    );

  return null;
};
