import { useState } from "react";
import CashierCreate from "../../../components/Cashier/CashierCreate";
import CashierTable from "../../../components/Cashier/CashierTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  // {
  //   title: "Img",
  //   dataIndex: "image",
  //   key: "image",
  //   fixed: "left",
  //   align: "center",
  //   width: 70,
  //   render: (img) => (
  //     <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
  //       <img
  //         src={img ?? defaultUser}
  //         alt="defaultUser"
  //         className="w-full h-full object-cover"
  //       />
  //     </div>
  //   ),
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    fixed: "left",

    render: ({ name, email }) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">{email}</span>
      </div>
    ),
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
    render: (companyName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {companyName}
      </span>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (phone) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {phone}
      </span>
    ),
  },
  {
    title: "Vat Number",
    dataIndex: "vatNumber",
    key: "vatNumber",
    align: "center",
    render: (vatNumber) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {vatNumber}
      </span>
    ),
  },
];

const Cashier = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <GlobalContainer
      pageTitle="Cashier List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CashierCreate />

      <CashierTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Cashier;
