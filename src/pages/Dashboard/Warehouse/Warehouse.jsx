import { useState } from "react";
import WarehouseCreate from "../../../components/Warehouse/WarehouseCreate";
import WarehouseTable from "../../../components/Warehouse/WarehouseTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    //department
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
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (email) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {email}
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
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 300,
    render: (address) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {address}
      </span>
    ),
  },
];

const Warehouse = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Warehouse"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <WarehouseCreate />

      <WarehouseTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Warehouse;
