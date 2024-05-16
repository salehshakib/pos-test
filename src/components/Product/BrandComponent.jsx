import { FaPlus } from "react-icons/fa";
import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import BrandCreate from "../Brand/BrandCreate";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";
import { useDispatch } from "react-redux";
import { openSubDrawer } from "../../redux/services/drawer/drawerSlice";

export const BrandComponent = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetBrandsQuery({});

  const options = data?.results?.brand?.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  const handleAddBrand = () => {
    dispatch(openSubDrawer());
  };

  return (
    <>
      <CustomSelectButton
        label="Brand"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleAddBrand}
        name={"brand_name"}
        isLoading={isFetching}
      />

      <BrandCreate subDrawer={true} />
    </>
  );
};
