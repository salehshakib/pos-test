import { useState } from "react";
import GlobalContainer from "../../../../container/GlobalContainer/GlobalContainer";
import SaleReturnCreate from "../../../../components/SaleReturn/SaleReturnCreate";
import SaleReturnTable from "../../../../components/SaleReturn/SaleReturnTable";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    align: "center",
    width: 80,
    render: (id) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {id}
      </span>
    ),
  },
  {
    title: "Purchase Reference",
    dataIndex: "purchaseReference",
    key: "purchaseReference",
    align: "center",
    render: (purchaseReference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {purchaseReference}
      </span>
    ),
  },
  {
    title: "Reference No",
    dataIndex: "referenceNo",
    key: "referenceNo",
    align: "center",
    render: (referenceNo) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {referenceNo}
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
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    align: "center",
    render: (supplier) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {supplier}
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
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    align: "center",
    render: (grandTotal) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {grandTotal}
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
    // render: ({ getDetails, handleDeleteModal }, record) => {
    //   return (
    //     <div className="flex justify-center items-center gap-3 ">
    //       <button
    //         onClick={() => getDetails(record.id)}
    //         className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //       >
    //         <MdEditSquare className="text-lg md:text-xl" />
    //       </button>
    //       <button
    //         onClick={() => handleDeleteModal(record.id)}
    //         className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //       >
    //         <MdDelete className="text-lg md:text-xl" />
    //       </button>
    //     </div>
    //   );
    // },
  },
];

const SaleReturn = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Sale Return List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <SaleReturnCreate />

      <SaleReturnTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default SaleReturn;
