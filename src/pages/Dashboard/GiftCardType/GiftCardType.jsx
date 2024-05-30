import { useState } from "react";
import { GiftCardTypeCreate } from "../../../components/GiftCardType/GiftCardTypeCreate";
import GiftCardTypeTable from "../../../components/GiftCardType/GiftCardTypeTable";
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
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    render: (type) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {type}
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
    //   render: ({ handleEdit, handleDeleteModal }, record) => {
    //     return (
    //       <div className="flex justify-center items-center gap-3 ">
    //         <button
    //           onClick={            onClick={ handleEdit}
  },
  //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
  //         >
  //           <MdEditSquare className="text-lg md:text-xl" />
  //         </button>
  //         <button
  //           onClick={()=>handleDeleteModal(record?.id)}
  //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
  //         >
  //           <MdDelete className="text-lg md:text-xl" />
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];

const GiftCardType = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Gift Card Type"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <GiftCardTypeCreate />

      <GiftCardTypeTable
        newColumns={newColumns}
        setSelectedRows={setSelectedRows}
      />
    </GlobalContainer>
  );
};
export default GiftCardType;
