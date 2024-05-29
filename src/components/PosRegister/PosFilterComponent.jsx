import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { Categories } from "./Categories/Categories";

const CategoryFilterComponent = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState();
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

const PosFilterComponent = () => {
  return (
    <div className="grid grid-cols-3 gap-3 pr-4 pt-5">
      <CategoryFilterComponent />
      <Button type="primary" size="large" className="w-full">
        Brand
      </Button>
      <Button type="primary" size="large" className="w-full">
        Featured
      </Button>
    </div>
  );
};

export default PosFilterComponent;
