import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useGetBrandsQuery } from "../../redux/services/brand/brandApi";
import { openBrandDrawer } from "../../redux/services/drawer/drawerSlice";
import BrandCreate from "../Brand/BrandCreate";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";

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
    dispatch(openBrandDrawer());
  };

  return (
    <>
      <CustomSelectButton
        label="Brand"
        showSearch={true}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleAddBrand}
        name={"brand_id"}
        isLoading={isFetching}
      />

      <BrandCreate subDrawer={true} />
    </>
  );
};
