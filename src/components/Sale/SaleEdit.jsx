import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetSaleDetailsQuery,
  useUpdateSaleMutation,
} from "../../redux/services/sale/saleApi";
import { appendToFormData } from "../../utilities/lib/appendFormData";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { SaleForm } from "./SaleForm";

export const SaleEdit = ({ id, setId }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetSaleDetailsQuery(
    {
      id,
      params: {
        child: 1,
        parent: 1,
      },
    },
    { skip: !id }
  );

  const [updateSale, { isLoading }] = useUpdateSaleMutation();

  const [formValues, setFormValues] = useState({
    product_list: {
      product_id: {},
      qty: {},
      sale_unit_id: {},
      net_unit_price: {},
      discount: {},
      tax_rate: {},
      tax: {},
      total: {},

      tax_id: {},
    },
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      console.log(data);
      console.log(fieldData);
      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const formData = new FormData();

    console.log(values);

    const postData = {
      ...values,
      _method: "PUT",
      // logo: values?.logo?.[0].originFileObj,
    };

    if (values?.logo?.[0]?.originFileObj) {
      postData.logo = values?.logo?.[0]?.originFileObj;
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
      title={"Edit Sale"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <SaleForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
        formValues={formValues}
        setFormValues={setFormValues}
        products={products}
        setProducts={setProducts}
      />
    </CustomDrawer>
  );
};
