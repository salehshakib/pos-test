import { Button } from "antd";
import { useState } from "react";
import CustomDrawer from "../Shared/Drawer/CustomDrawer";
import { Brands } from "./Brand/Brands";
import { Categories } from "./Categories/Categories";

const CategoryFilterComponent = ({ setParams }) => {
  const [isFilterDraweropen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  // const [isSelected, setIsSelected] = useState([]);

  // const handleCardSelect = (id) => {
  //   if (isSelected.includes(id)) {
  //     setIsSelected(isSelected.filter((item) => item !== id));
  //   } else {
  //     setIsSelected([...isSelected, id]);
  //   }
  // };

  // const handleSubmit = async () => {
  //   setParams({ category_ids: isSelected });

  //   handleCloseDrawer();
  // };

  return (
    <>
      <Button
        type="primary"
        // size="large"
        className="w-full"
        onClick={handleOpenDrawer}
      >
        Category
      </Button>

      <CustomDrawer
        title={"Choose Category"}
        open={isFilterDraweropen}
        onClose={handleCloseDrawer}
        width={1400}
      >
        <Categories
          // handleSubmit={handleSubmit}
          onClose={handleCloseDrawer}
          setParams={setParams}
        />
      </CustomDrawer>
    </>
  );
};

const BrandFilterComponent = ({ setParams }) => {
  const [isFilterDraweropen, setIsFilterDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsFilterDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsFilterDrawerOpen(false);
  };

  const [isSelected, setIsSelected] = useState([]);

  const handleCardSelect = (id) => {
    if (isSelected.includes(id)) {
      setIsSelected(isSelected.filter((item) => item !== id));
    } else {
      setIsSelected([...isSelected, id]);
    }
  };

  const handleSubmit = async () => {
    setParams({ brand_ids: isSelected });

    handleCloseDrawer();
  };

  return (
    <>
      <Button
        type="primary"
        // size="large"
        className="w-full"
        onClick={handleOpenDrawer}
      >
        Brand
      </Button>

      <CustomDrawer
        title={"Choose Brand"}
        open={isFilterDraweropen}
        width={1400}
        onClose={handleCloseDrawer}
      >
        <Brands
          handleSubmit={handleSubmit}
          onClose={handleCloseDrawer}
          isSelected={isSelected}
          handleCardSelect={handleCardSelect}
        />
      </CustomDrawer>
    </>
  );
};

const PosFilterComponent = ({ setParams }) => {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pt-5">
      <CategoryFilterComponent setParams={setParams} />

      <BrandFilterComponent setParams={setParams} />
    </div>
  );
};

export default PosFilterComponent;
