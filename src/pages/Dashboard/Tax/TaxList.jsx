import { useState } from "react";
import { MdDelete } from "react-icons/md";
import TaxCreate from "../../../components/Tax/TaxCreate";
import TaxTable from "../../../components/Tax/TaxTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
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
    title: "Rate (%)",
    dataIndex: "rate",
    key: "rate",
    align: "center",
    render: (rate) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {rate}
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
    render: ({ handleDeleteModal }, record) => {
      return (
        <div className="flex justify-center items-center gap-3 ">
          <button
            onClick={() => handleDeleteModal(record?.id)}
            className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
          >
            <MdDelete className="text-lg md:text-xl" />
          </button>
        </div>
      );
    },
  },
];

const TaxList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Tax List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <TaxCreate />

      <TaxTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default TaxList;
