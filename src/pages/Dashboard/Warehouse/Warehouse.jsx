import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import WarehouseCreate from "../../../components/Warehouse/WarehouseCreate";
import WarehouseTable from "../../../components/Warehouse/WarehouseTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { WAREHOUSE } from "../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

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
        {email ?? "N/A"}
      </span>
    ),
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    render: (phone) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {phone ?? "N/A"}
      </span>
    ),
  },
];

const Warehouse = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Warehouse"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={WAREHOUSE}
    >
      <WarehouseCreate />

      <WarehouseTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Warehouse;
