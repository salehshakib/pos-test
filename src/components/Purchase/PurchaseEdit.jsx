import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetPurchaseDetailsQuery,
  useUpdatePurchaseMutation,
} from "../../redux/services/purchase/purchaseApi";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { PurchaseForm } from "./PurchaseForm";

export const PurchaseEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetPurchaseDetailsQuery(
    { id },
    { skip: !id || !isEditDrawerOpen }
  );

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

  useEffect(() => {
    if (!isEditDrawerOpen) {
      setFormValues({
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

      setProducts([]);

      setProductUnits({
        purchase_units: {},
        tax_rate: {},
      });
    }
  }, [isEditDrawerOpen]);

  const [updateSale, { isLoading }] = useUpdatePurchaseMutation();

  useEffect(() => {
    if (data && isEditDrawerOpen) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, isEditDrawerOpen, setFields]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    console.log(values);

    const postData = {
      ...values,
      _method: "PUT",
    };

    // logo: values?.logo?.[0].originFileObj,

    if (values?.logo?.[0].originFileObj) {
      postData.logo = values?.logo?.[0].originFileObj;
    }
    appendToFormData(postData, formData);

    const { data, error } = await updateSale({
      id,
      data: formData,
    });

    if (data?.success) {
      setId(undefined);
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };

  return (
    <CustomDrawer
      title={"Edit Purchase"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <PurchaseForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};
