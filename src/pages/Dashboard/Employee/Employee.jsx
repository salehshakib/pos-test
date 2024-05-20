import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import EmployeeCreate from "../../../components/Employee/EmployeeCreate";
import EmployeeTable from "../../../components/Employee/EmployeeTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { defaultUser } from "../../../assets/data/defaultUserImage";

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
    title: "Img",
    dataIndex: "image",
    key: "image",
    fixed: "left",
    align: "center",
    width: 70,
    render: (img) => (
      <div className="w-8 h-8 rounded-full overflow-hidden mx-auto">
        <img
          src={img ?? defaultUser}
          alt="defaultUser"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <div className="flex flex-col cursor-pointer ">
        <span className="text-xs md:text-sm text-dark dark:text-white87 font-medium">
          {name}
        </span>
        <span className="text-xs dark:text-white60 primary-text">
          admin@gmail.com
        </span>
      </div>
    ),
  },
  {
    //adress
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {address}
      </span>
    ),
  },
  {
    //phone
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
    //department
    title: "Department",
    dataIndex: "department",
    key: "department",
    align: "center",
    render: (department) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {department}
      </span>
    ),
  },
  {
    //action
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 50,
    fixed: "right",
    render: () => (
      <div className="flex justify-center items-center gap-3 ">
        <button className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300">
          <MdEditSquare className="text-xl" />
        </button>
        <button className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300">
          <MdDelete className="text-xl" />
        </button>
      </div>
    ),
  },
];

const Employee = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Employee List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <EmployeeCreate />

      <EmployeeTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default Employee;
