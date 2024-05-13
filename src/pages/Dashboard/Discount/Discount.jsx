import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import DiscountCreate from "../../../components/Discount/DiscountCreate";

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
    // name
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    // value
    title: "Value",
    dataIndex: "value",
    key: "value",
    align: "center",
    render: (value) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {value}
      </span>
    ),
  },
  {
    // discount plan
    title: "Discount Plan",
    dataIndex: "discount_plan",
    key: "discount_plan",
    align: "center",
    render: (discountPlan) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {discountPlan}
      </span>
    ),
  },
  {
    // validity
    title: "Validity",
    dataIndex: "validity",
    key: "validity",
    align: "center",
    render: (validity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {validity}
      </span>
    ),
  },
  {
    // days
    title: "Days",
    dataIndex: "days",
    key: "days",
    align: "center",
    render: (days) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {days}
      </span>
    ),
  },
  {
    // products
    title: "Products",
    dataIndex: "products",
    key: "products",
    align: "center",
    render: (products) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {products}
      </span>
    ),
  },

  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    render: (created_at) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {created_at}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "80px",
    align: "center",
    render: ({ status, handleStatusModal }, record) => {
      return (
        <button
          className={`p-0 ${
            status == 1 ? "bg-[#22C55E]" : "bg-[#EF4444]"
          } rounded shadow-md w-[80px]`}
          onClick={() => handleStatusModal(record.id)}
        >
          <span className="font-medium text-white text-xs px-2 w-full">
            {status == 1 ? "Active" : "Inactive"}
          </span>
        </button>
      );
    },
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
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdEditSquare className="text-lg md:text-xl" />
          </button>
          <button
            onClick={() => handleDeleteModal(record.id)}
            className="bg-secondary p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const Discount = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Discount List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <DiscountCreate />

      {/* <discountT
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      /> */}
    </GlobalContainer>
  );
};

export default Discount;
