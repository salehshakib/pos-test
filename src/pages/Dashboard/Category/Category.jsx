import { useState } from "react";
import defaultUser from "../../../assets/data/defaultUserImage";
import CategoryCreate from "../../../components/Category/CategoryCreate";
import CategoryTable from "../../../components/Category/CategoryTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Img",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-md overflow-hidden mx-auto">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Parent Category",
    dataIndex: "parentCategory",
    key: "parentCategory",
    render: (parentCategory) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {parentCategory}
      </span>
    ),
  },
];

const Category = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Category"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CategoryCreate />
      <CategoryTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Category;
