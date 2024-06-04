import { Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDrawer } from "../../../redux/services/drawer/drawerSlice";
import { useCreateQuotationMutation } from "../../../redux/services/quotation/quotationApi";
import CustomDrawer from "../../Shared/Drawer/CustomDrawer";
import { QuotationForm } from "./QuotationForm";
import { appendToFormData } from "../../../utilities/lib/appendFormData";

const QuotationCreate = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createQuotation, { isLoading }] = useCreateQuotationMutation();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    const { product_list, attachment } = values ?? {};

    const productListArray = product_list?.qty
      ? Object.keys(product_list.qty)
          .filter((product_id) => product_list.qty[product_id] !== undefined)
          .map((product_id) => ({
            product_id: parseInt(product_id),
            qty: product_list.qty[product_id],
          }))
      : [];

    const postObj = {
      ...values,
      attachment: attachment?.[0].originFileObj,
      product_list: JSON.stringify(productListArray),
    };

    appendToFormData(postObj, formData);

    const { data, error } = await createQuotation({ data: formData });

    if (data?.success) {
      dispatch(closeCreateDrawer());
      form.resetFields();
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
      title={"Create Quotation"}
      open={isCreateDrawerOpen}
      form={form}
    >
      <QuotationForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default QuotationCreate;
