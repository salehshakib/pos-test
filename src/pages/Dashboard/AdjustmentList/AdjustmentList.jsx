import { useState } from "react";
import AdjustmentCreate from "../../../components/Adjustment/AdjustmentCreate";
import AdjustmentTable from "../../../components/Adjustment/AdjustmentTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Reference ID",
    dataIndex: "reference",
    key: "reference",
    align: "center",
    render: (reference) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {reference}
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
    title: "Note",
    dataIndex: "note",
    key: "note",
    align: "center",
    render: (note) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {note}
      </span>
    ),
  },
  // {
  //   title: "Action",
  //   dataIndex: "action",
  //   key: "action",
  //   align: "center",
  //   width: 70,
  //   fixed: "right",
  //   render: ({ handleDetailsModal, handleEdit, handleDeleteModal }, record) => {
  //     return (
  //       <div className="flex justify-center items-center gap-3 ">
  //         <button
  //           onClick={() => handleDetailsModal(record?.id)}
  //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
  //         >
  //           <TbListDetails className="text-lg md:text-xl" />
  //         </button>

  //         <Dropdown
  //           menu={{
  //             items: [
  //               {
  //                 key: "edit",
  //                 label: (
  //                   <div
  //                     onClick={() => handleEdit(record?.id)}
  //                     className="flex justify-start items-center gap-3"
  //                   >
  //                     <MdEditSquare className="text-lg md:text-xl" />
  //                     Edit
  //                   </div>
  //                 ),
  //               },
  //               {
  //                 key: "due",
  //                 label: (
  //                   <div className="flex justify-start items-center gap-3">
  //                     <PiBroom className="text-lg md:text-xl" />
  //                     Due Clear
  //                   </div>
  //                 ),
  //               },
  //               {
  //                 key: "delete",
  //                 label: (
  //                   <div
  //                     onClick={() => handleDeleteModal(record?.id)}
  //                     className="flex justify-start items-center gap-3"
  //                   >
  //                     <MdDelete className="text-lg md:text-xl" />
  //                     Delete
  //                   </div>
  //                 ),
  //               },
  //             ],
  //           }}
  //           placement="bottom"
  //           trigger={["click"]}
  //         >
  //           <button className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300">
  //             <FiMoreHorizontal className="text-lg md:text-xl" />
  //           </button>
  //         </Dropdown>
  //       </div>
  //     );
  //   },
  // },
];

const AdjustmentList = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Adjustment"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <AdjustmentCreate />

      <AdjustmentTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};

export default AdjustmentList;
