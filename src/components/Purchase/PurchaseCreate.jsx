import { Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { useCreatePurchaseMutation } from "../../redux/services/purchase/purchaseApi";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { PurchaseForm } from "./PurchaseForm";

export const PurchaseCreate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();

  const [formValues, setFormValues] = useState({
    product_list: {
      product_id: {},
      qty: {},
      recieved: {},
      purchase_unit_id: {},
      net_unit_cost: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
  });
  const [products, setProducts] = useState([]);
  const [productUnits, setProductUnits] = useState({
    purchase_units: {},
  });

  const handleSubmit = async (values) => {
    console.log(values);
    // const { data, error } = await createPurchase({
    //   data: values,
    // });
    // if (data?.success) {
    //   dispatch(closeCreateDrawer());
    //   form.resetFields();
    // }
    // if (error) {
    //   const errorFields = Object.keys(error?.data?.errors).map((fieldName) => ({
    //     name: fieldName,

    //     errors: error?.data?.errors[fieldName],
    //   }));
    //   setErrorFields(errorFields);
    // }
  };

  return (
    <CustomDrawer
      title={"Create Purchase"}
      open={isCreateDrawerOpen}
      width={1400}
    >
      <PurchaseForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
        productUnits={productUnits}
        setProductUnits={setProductUnits}
      />
    </CustomDrawer>
  );
};
