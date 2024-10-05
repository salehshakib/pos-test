import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  closeCreateDrawer,
  openCreateDrawer,
} from '../../redux/services/drawer/drawerSlice';
import { useCreateStockRequestMutation } from '../../redux/services/stockRequest/stockRequestApi';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import { StockRequestForm } from './StockRequestForm';

const StockRequestCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createStockRequest, { isLoading }] = useCreateStockRequestMutation();

  const [formValues, setFormValues] = useState({
    product_list: { qty: {}, min_qty: {} },
  });

  const [products, setProducts] = useState([]);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.selectedProduct) {
      dispatch(openCreateDrawer());
      const { selectedProduct } = state;
      setProducts([selectedProduct]);
      navigate(window.location.pathname, { replace: true });
    }
  }, [state, navigate, dispatch]);

  const handleSubmit = async (values) => {
    const { from_warehouse_id, to_warehouse_id, note } = values;

    const { product_list } = formValues;

    const formData = new FormData();

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_variant_id: parseInt(product_id),
            alert_qty: product_list.min_qty[product_id],
            need_qty: product_list.qty[product_id],
          }))
      : [];

    const postObj = {
      from_warehouse_id: parseInt(from_warehouse_id),
      to_warehouse_id: parseInt(to_warehouse_id),
      product_list: JSON.stringify(productListArray),
      note,
    };
    appendToFormData(postObj, formData);

    const { data, error } = await createStockRequest({
      data: formData,
    });

    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();
      setFormValues({ product_list: { qty: {}, min_qty: {} } });
    }
    if (error) {
      const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
        name: fieldName,

        errors: error?.data?.errors[fieldName],
      }));
      setErrorFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={'Create Stock Request'}
      open={isCreateDrawerOpen}
      width={1400}
    >
      <StockRequestForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
        // isLoadingProducts={isLoadingProducts}
      />
    </CustomDrawer>
  );
};

export default StockRequestCreate;
