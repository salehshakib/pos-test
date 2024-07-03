import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomerCreate from "../../../components/Customer/CustomerCreate";
import CustomerTable from "../../../components/Customer/CustomerTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { clearParams } from "../../../redux/services/paramSlice/paramSlice";
import { CUSTOMER } from "../../../utilities/apiEndpoints/people.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    align: "left",
    render: (companyName) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {companyName}
      </span>
    ),
  },

  {
    title: "Customer Group",
    dataIndex: "customerGroup",
    key: "customerGroup",
    align: "center",
    render: (customerGroup) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {customerGroup}
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
];

const Customer = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);
  const { keyword, debounce } = useCustomDebounce();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  return (
    <GlobalContainer
      pageTitle="Customer"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      api={CUSTOMER}
    >
      <CustomerCreate />

      <CustomerTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Customer;
