import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../redux/services/category/categoryApi";
import { openSubDrawer } from "../../redux/services/drawer/drawerSlice";
import CategoryCreate from "../Category/CategoryCreate";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";

export const CategoryComponent = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetCategoriesQuery({});

  const options = data?.results?.category?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  function handleAddCategory() {
    dispatch(openSubDrawer());
  }
  return (
    <>
      <CustomSelectButton
        label="Category"
        showSearch={true}
        required={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleAddCategory}
        name={"brand"}
        isLoading={isFetching}
      />

      <CategoryCreate subDrawer={true} />
    </>
  );
};
