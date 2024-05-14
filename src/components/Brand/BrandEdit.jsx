import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetBrandDetailsQuery,
  useUpdateBrandMutation,
} from "../../redux/services/brand/brandApi";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import BrandForm from "./BrandForm";

export const BrandEdit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetBrandDetailsQuery({ id }, { skip: !id });

  console.log(data);

  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

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
    const { data, error } = await updateBrand({
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
      title={"Edit Brand"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <BrandForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};
