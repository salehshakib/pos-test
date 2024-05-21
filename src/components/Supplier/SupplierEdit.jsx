import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetSupplierDetailsQuery,
  useUpdateSupplierMutation,
} from "../../redux/services/supplier/supplierApi";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import SupplierForm from "./SupplierForm";

const SupplierEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetSupplierDetailsQuery(
    { id },
    { skip: !id }
  );
  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateSupplier({
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
      title={"Edit Supplier"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <SupplierForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default SupplierEdit;
