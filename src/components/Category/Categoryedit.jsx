import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../redux/services/inventory/category/categoryApi";
import { closeEditDrawer } from "../../redux/services/drawer/drawerSlice";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import CategoryForm from "../../pages/Dashboard/Inventory/Category/CategoryForm";
import { errorFieldsUpdate } from "../../utilities/lib/errorFieldsUpdate";

const Categoryedit = ({ id, setId }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);

  const { isEditDrawerOpen } = useSelector((state) => state.drawer);

  const { data, isFetching } = useGetCategoryDetailsQuery(
    { id },
    { skip: !id }
  );

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (data) {
      const fieldData = [
        {
          name: "name",
          value: data?.name,
          errors: "",
        },
        {
          name: "parent_id",
          value: Number(data?.parent_id),
          errors: "",
        },
      ];

      setFields(fieldData);
    }
  }, [data, setFields]);

  const handleUpdate = async (values) => {
    const { data, error } = await updateCategory({
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
      title={"Edit Category"}
      open={isEditDrawerOpen}
      isLoading={isFetching}
    >
      <CategoryForm
        handleSubmit={handleUpdate}
        isLoading={isLoading}
        fields={fields}
      />
    </CustomDrawer>
  );
};

export default Categoryedit;
