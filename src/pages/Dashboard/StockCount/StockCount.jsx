import { useState } from "react";
import StockCountCreate from "../../../components/StockCount/StockCountCreate";
import StockCountTable from "../../../components/StockCount/StockCountTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { STOCK_COUNT } from "../../../utilities/apiEndpoints/inventory.api";

const columns = [
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
  // {
  //   title: "Date",
  //   dataIndex: "created_at",
  //   key: "created_at",
  //   align: "center",
  //   render: (created_at) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {created_at}
  //     </span>
  //   ),
  // },
  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   width: "80px",
  //   align: "center",
  //   render: ({ status, handleStatusModal }, record) => {
  //     return (
  //       <button
  //         className={`p-0 ${
  //           status == 1
  //             ? "bg-[#DCFCE7] text-[#16A34A]"
  //             : "bg-[#FEF2F2] text-[#EF4444]"
  //         } rounded shadow-md w-[80px]`}
  //         onClick={() => handleStatusModal(record.id)}
  //       >
  //         <span className="font-medium text-xs px-2 w-full">
  //           {status == 1 ? "Active" : "Inactive"}
  //         </span>
  //       </button>
  //     );
  //   },
  // },
  // {
  //   title: "Action",
  //   dataIndex: "action",
  //   key: "action",
  //   align: "center",
  //   width: 70,
  //   fixed: "right",
  //   render: ({ handleEdit, handleDeleteModal }, record) => {
  //     return (
  //       <div className="flex justify-center items-center gap-3 ">
  //         <button
  //           onClick={() => handleEdit(record?.id)}
  //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
  //         >
  //           <MdEditSquare className="text-lg md:text-xl" />
  //         </button>
  //         <button
  //           onClick={() => handleDeleteModal(record?.id)}
  //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
  //         >
  //           <MdDelete className="text-lg md:text-xl" />
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];

const StockCount = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Stock Count"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
      api={STOCK_COUNT}
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
