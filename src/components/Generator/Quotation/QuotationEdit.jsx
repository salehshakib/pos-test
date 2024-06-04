import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../../redux/services/drawer/drawerSlice";
import {
  useGetQuotationDetailsQuery,
  useUpdateQuotationMutation,
} from "../../../redux/services/quotation/quotationApi";
import { errorFieldsUpdate } from "../../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../../Shared/Drawer/CustomDrawer";
import { QuotationForm } from "./QuotationForm";
import { appendToFormData } from "../../../utilities/lib/appendFormData";

const QuotationEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetQuotationDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateQuotation, { isLoading }] = useUpdateQuotationMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
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
      product_list: JSON.stringify(productListArray),
    };

    if (attachment) {
      postObj.attachment = attachment?.[0].originFileObj;
    }

    appendToFormData(postObj, formData);

    const { data, error } = await updateQuotation({
      id,
      data: formData,
    });

    if (data?.success) {
      dispatch(closeEditDrawer());
    }

    if (error) {
      const errorFields = errorFieldsUpdate(fields, error);

      setFields(errorFields);
    }
  };
  return (
    <CustomDrawer
      title={"Edit Quotation"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <QuotationForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default QuotationEdit;
