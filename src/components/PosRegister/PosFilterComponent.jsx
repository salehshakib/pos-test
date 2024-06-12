import { Button } from "antd";
import { useState } from "react";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { Categories } from "./Categories/Categories";
import { Brands } from "./Brand/Brands";

const CategoryFilterComponent = () => {
  const [isFilterDraweropen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        className="w-full"
        onClick={handleOpenDrawer}
      >
        Category
      </Button>

      <CustomDrawer
        title={"Choose Category"}
        open={isFilterDraweropen}
        onClose={handleCloseDrawer}
      >
        <Categories />
      </CustomDrawer>
    </>
  );
};

const BrandFilterComponent = () => {
  const [isFilterDraweropen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        className="w-full"
        onClick={handleOpenDrawer}
      >
        Brand
      </Button>

      <CustomDrawer
        title={"Choose Brand"}
        open={isFilterDraweropen}
        onClose={handleCloseDrawer}
      >
        <Brands />
      </CustomDrawer>
    </>
  );
};

const PosFilterComponent = () => {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pt-5">
      <CategoryFilterComponent />

      <BrandFilterComponent />
      {/* <Button type="primary" size="large" className="w-full">
        Featured
      </Button> */}
    </div>
  );
};

export default PosFilterComponent;
