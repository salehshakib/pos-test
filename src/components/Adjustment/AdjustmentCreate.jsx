import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAdjustmentMutation } from '../../redux/services/adjustment/adjustmentApi';
import { closeCreateDrawer } from '../../redux/services/drawer/drawerSlice';
import { appendToFormData } from '../../utilities/lib/appendFormData';
import CustomDrawer from '../Shared/Drawer/CustomDrawer';
import AdjustmentForm from './AdjustmentForm';

const AdjustmentCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createAdjustment, { isLoading }] = useCreateAdjustmentMutation();

  const [formValues, setFormValues] = useState({
    product_list: { qty: {}, action: {} },
  });

  const [products, setProducts] = useState([]);

  const handleSubmit = async (values) => {
    const { warehouse_id, attachment, note } = values;

    const { product_list } = formValues;

    const formData = new FormData();

    // const productListArray = Object.keys(product_list?.qty).map(
    //   (product_id) => {
    //     return {
    //       product_id: parseInt(product_id),
    //       qty: product_list?.qty[product_id],
    //       action: product_list?.action[product_id],
    //     };
    //   }
    // );

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
            qty: product_list.qty[product_id],
            action: product_list.action[product_id],
          }))
      : [];

    const postObj = {
      // attachment:
      //   attachment?.length > 0
      //     ? attachment?.map((file) => file.originFileObj)
      //     : [],

      warehouse_id: parseInt(warehouse_id),
      product_list: JSON.stringify(productListArray),
      note,
    };

    if (attachment?.length > 0) {
      postObj.attachment = attachment?.[0]?.originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await createAdjustment({ formData });

    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();
      setFormValues({ product_list: { qty: {}, action: {} } });
      setProducts([]);
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
      title={'Create Adjustment'}
      open={isCreateDrawerOpen}
      width={1400}
    >
      <AdjustmentForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
    </CustomDrawer>
  );
};

export default AdjustmentCreate;
