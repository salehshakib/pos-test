import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import {
  useGetWarehouseDetailsQuery,
  useUpdateWarehouseMutation,
} from "../../redux/services/warehouse/warehouseApi";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import WarehouseForm from "./WarehouseForm";

const WarehouseEdit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetWarehouseDetailsQuery(
    { id },
    { skip: !id }
  );

  console.log(data);

  const [updateWarehouse, { isLoading }] = useUpdateWarehouseMutation();

  useEffect(() => {
    if (data) {
      // const fieldData = fieldsToUpdate(data);
      const fieldData = [
        {
          name: "name",
          value: data?.name,
          errors: "",
        },
      ];

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateWarehouse({
      data: { id, ...values },
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
      title={"Edit Warehouse"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <WarehouseForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};
export default WarehouseEdit;
