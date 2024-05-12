import { useState } from "react";
import GiftCardCreate from "../../../components/GiftCard/GiftCardCreate";
import GiftCardTable from "../../../components/GiftCard/GiftCardTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

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
    title: "Image",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
        <img
          src={img}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    align: "center",
    render: (customer) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customer}
      </span>
    ),
  },
  {
    title: "Card No",
    dataIndex: "cardNo",
    key: "cardNo",
    align: "center",
    render: (cardNo) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cardNo}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Expense",
    dataIndex: "expense",
    key: "expense",
    align: "center",
    render: (expense) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {expense}
      </span>
    ),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    align: "center",
    render: (balance) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {balance}
      </span>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    align: "center",
    render: (createdBy) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {createdBy}
      </span>
    ),
  },
  {
    title: "Created At",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (time) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {time}
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
    //   render: ({ getDetails, handleDeleteModal }, record) => {
    //     return (
    //       <div className="flex justify-center items-center gap-3 ">
    //         <button
    //           onClick={() => getDetails(record.id)}
    //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //         >
    //           <MdEditSquare className="text-lg md:text-xl" />
    //         </button>
    //         <button
    //           onClick={() => handleDeleteModal(record.id)}
    //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //         >
    //           <MdDelete className="text-lg md:text-xl" />
    //         </button>
    //       </div>
    //     );
    //   },
  },
];

const GiftCardList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Gift Card List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <GiftCardCreate />

      <GiftCardTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
export default GiftCardList;
