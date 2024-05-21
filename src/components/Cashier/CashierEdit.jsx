import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCashierDetailsQuery,
  useUpdateCashierMutation,
} from "../../redux/services/cashier/cashierApi";
import { fieldsToUpdate } from "../../utilities/lib/fieldsToUpdate";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CashierForm from "./CashierForm";

const CashierEdit = ({ id }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetCashierDetailsQuery({ id }, { skip: !id });
  const [updateCashier, { isLoading }] = useUpdateCashierMutation();

  useEffect(() => {
    if (data) {
      const fieldData = fieldsToUpdate(data);

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateCashier({
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
      title={"Edit Cashier"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <CashierForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default CashierEdit;
