import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCustomerDetailsQuery,
  useUpdateCustomerMutation,
} from "../../redux/services/customer/customerApi";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { CustomerForm } from "./CustomerForm";

const CustomerEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetCustomerDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateCustomerGroup, { isLoading }] = useUpdateCustomerMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateCustomerGroup({
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
      title={"Edit Customer"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <CustomerForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default CustomerEdit;
