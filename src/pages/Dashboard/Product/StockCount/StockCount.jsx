import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import StockCountCreate from "../../../../components/StockCount/StockCountCreate";
import StockCountTable from "../../../../components/StockCount/StockCountTable";

const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "id",
  //   key: "id",
  //   fixed: "left",
  //   align: "center",
  //   width: 80,
  //   render: (id) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {id}
  //     </span>
  //   ),
  // },

  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
      </span>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    align: "center",
    render: (warehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {warehouse}
      </span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    align: "center",
    render: (category) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {category}
      </span>
    ),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    align: "center",
    render: (brand) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {brand}
      </span>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
      </span>
    ),
  },
  {
    title: "Initial File",
    dataIndex: "initialFile",
    key: "initialFile",
    align: "center",
    render: (initialFile) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {initialFile}
      </span>
    ),
  },
  {
    title: "Final File",
    dataIndex: "finalFile",
    key: "finalFile",
    align: "center",
    render: (finalFile) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {finalFile}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (date) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {date}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 70,
    fixed: "right",
    render: ({ getDetails, handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => getDetails(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const StockCount = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Stock Count List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <StockCountCreate />
      <StockCountTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default StockCount;
