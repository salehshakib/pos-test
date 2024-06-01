import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import GiftCardForm from "./GiftCardForm";
import { useCreateGiftCardMutation } from "../../redux/services/giftcard/giftcard/giftCardApi";
import { closeCreateDrawer } from "../../redux/services/drawer/drawerSlice";

const GiftCardCreate = () => {
  const dispatch = useDispatch();
  const [errorFields, setErrorFields] = useState([]);
  const { isCreateDrawerOpen } = useSelector((state) => state.drawer);

  const [createGiftCard, { isLoading }] = useCreateGiftCardMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    const { data, error } = await createGiftCard({
      data: values,
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
    <CustomDrawer title={"Create Gift Card"} open={isCreateDrawerOpen}>
      <GiftCardForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        fields={errorFields}
      />
    </CustomDrawer>
  );
};

export default GiftCardCreate;
