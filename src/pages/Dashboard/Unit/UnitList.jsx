import { useState } from "react";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import UnitCreate from "../../../components/Unit/UnitCreate";
import UnitTable from "../../../components/Unit/UnitTable";
import { MdDelete } from "react-icons/md";

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
    title: "Code",
    dataIndex: "code",
    key: "code",
    align: "center",
    render: (code) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {code}
      </span>
    ),
  },

  {
    title: "Base Unit",
    dataIndex: "baseUnit",
    key: "baseUnit",
    align: "center",
    render: (baseUnit) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {baseUnit}
      </span>
    ),
  },
  // {
  //   title: "Operator",
  //   dataIndex: "operator",
  //   key: "operator",
  //   align: "center",
  //   render: (operator) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {operator}
  //     </span>
  //   ),
  // },
  // {
  //   title: "Operator Value",
  //   dataIndex: "operatorValue",
  //   key: "operatorValue",
  //   align: "center",
  //   render: (operatorValue) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {operatorValue}
  //     </span>
  //   ),
  // },
  {
    //created_at
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

const UnitList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Unit List"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <UnitCreate />

      <UnitTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default UnitList;
