import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import AdjustmentForm from "./AdjustmentForm";
import { useCreateAdjustmentMutation } from "../../redux/services/adjustment/adjustmentApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { appendToFormData } from "../../utilities/lib/appendFormData";
// import RolePermissionForm from "../RolePermission/RolePermissionForm";

const AdjustmentCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createAdjustment, { isLoading }] = useCreateAdjustmentMutation();

  const handleSubmit = async ({
    warehouse_id,
    product_list,
    attachment,
    note,
  }) => {
    const formData = new FormData();

    const productListArray = Object.keys(product_list.qty).map((product_id) => {
      return {
        product_id: parseInt(product_id),
        qty: product_list.qty[product_id],
        action: product_list.action[product_id],
      };
    });

    const attachmentObj = {
      attachment: attachment[0]?.originFileObj,
    };

    appendToFormData(attachmentObj, formData);

    const postData = {
      warehouse_id,
      product_list: JSON.stringify(productListArray),
      note,
      formData,
    };

    const { data, error } = await createAdjustment({
      data: postData,
    });

    if (data?.success) {
      dispatch(closeCreateDrawer());
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
    <CustomDrawer title={"Create Adjustment"} open={isCreateDrawerOpen}>
      {/* <RolePermissionForm
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        fields={errorFields}
      /> */}
      <AdjustmentForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default AdjustmentCreate;
