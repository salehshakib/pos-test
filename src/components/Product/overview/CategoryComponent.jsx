import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../../redux/services/category/categoryApi";
import { openCategoryDrawer } from "../../../redux/services/drawer/drawerSlice";
import CategoryCreate from "../../Category/CategoryCreate";
import { CustomSelectButton } from "../../Shared/Select/CustomSelectButton";

export const CategoryComponent = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCategoriesQuery({});

  const options = data?.results?.category?.map((item) => {
    return {
      value: item.id?.toString(),
      label: item.name,
    };
  });

  function handleAddCategory() {
    dispatch(openCategoryDrawer());
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
        name={"category_id"}
        isLoading={isLoading}
      />

      <CategoryCreate subDrawer={true} />
    </>
  );
};
