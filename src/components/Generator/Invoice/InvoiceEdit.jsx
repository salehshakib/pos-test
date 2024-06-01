import { Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../../redux/services/drawer/drawerSlice";
import {
  useGetInvoiceDetailsQuery,
  useUpdateInvoiceMutation,
} from "../../../redux/services/invoice/invoiceApi";
import { errorFieldsUpdate } from "../../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../../Shared/Drawer/CustomDrawer";
import { InvoiceForm } from "./InvoiceForm";

const InvoiceEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetInvoiceDetailsQuery({ id }, { skip: !id });
  const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateInvoice({
      id,
      data: values,
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
      title={"Edit Invoice"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <InvoiceForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
        form={form}
      />
    </CustomDrawer>
  );
};

export default InvoiceEdit;
