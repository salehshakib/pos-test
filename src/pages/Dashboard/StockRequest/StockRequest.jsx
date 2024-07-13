import { useState } from "react";
import StockRequestCreate from "../../../components/StockRequest/StockRequestCreate";
import StockRequestTable from "../../../components/StockRequest/StockRequestTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { STOCK_COUNT } from "../../../utilities/apiEndpoints/inventory.api";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";
import { useFilterParams } from "../../../utilities/hooks/useParams";

// const productColumns = [
//   {
//     title: "Product",
//     dataIndex: "name",
//     key: "name",
//     render: (name) => (
//       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
//         {name}
//       </span>
//     ),
//   },
//   {
//     title: "Alert Qty",
//     dataIndex: "alertQty",
//     key: "alertQty",
//     render: (alertQty) => (
//       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
//         {alertQty}
//       </span>
//     ),
//   },
//   {
//     title: "Need Qty",
//     dataIndex: "needQty",
//     key: "needQty",
//     render: (needQty) => (
//       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
//         {needQty}
//       </span>
//     ),
//   },
// ];

const columns = [
  // {
  //   title: "Reference",
  //   dataIndex: "products",
  //   key: "reference",
  //   align: "center",
  //   render: (reference) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {reference}
  //     </span>
  //   ),
  // },
  {
    title: "From Warehouse",
    dataIndex: "fromWarehouse",
    key: "fromWarehouse",
    render: (fromWarehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {fromWarehouse ?? "N/A"}
      </span>
    ),
  },
  {
    title: "To Warehouse",
    dataIndex: "toWarehouse",
    key: "toWarehouse",
    render: (toWarehouse) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {toWarehouse ?? "N/A"}
      </span>
    ),
  },
  {
    title: "Request Products",
    dataIndex: "products",
    key: "products",
    align: "center",
    render: (products) =>
      products?.length > 0 &&
      products?.map((item) => (
        <div
          className="text-xs font-medium md:text-sm text-dark dark:text-white87 grid grid-cols-2"
          key={item?.id}
        >
          <span className="text-start">{item?.products?.name}</span>
          <span className="text-start">Request: {item?.need_qty}</span>
        </div>
      )),
    // children: [
    //   {
    //     title: "Product",
    //     dataIndex: "name",
    //     key: "name",
    //     render: (name) => (
    //       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
    //         {name}
    //       </span>
    //     ),
    //   },
    //   {
    //     title: "Alert Qty",
    //     dataIndex: "alertQty",
    //     key: "alertQty",
    //     render: (alertQty) => (
    //       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
    //         {alertQty}
    //       </span>
    //     ),
    //   },
    //   {
    //     title: "Need Qty",
    //     dataIndex: "needQty",
    //     key: "needQty",
    //     render: (needQty) => (
    //       <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
    //         {needQty}
    //       </span>
    //     ),
    //   },
    // ],
    // render: (products) => {
    //   return (
    //     <Table
    //       columns={productColumns}
    //       dataSource={products}
    //       size="small"
    //       pagination={false}
    //       className="w-full"
    //     />
    //   );
    // },

    // render: (products) => {
    //   return (
    //     products.length  && products?.map((product) => {
    //       return (
    //         <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
    //           {product?.name}
    //         </span>
    //       );
    //     })
    //   )
    // },
  },
  // {
  //   title: "Status",
  //   dataIndex: "status",
  //   key: "status",
  //   width: "100px",
  //   align: "center",
  //   render: (status) => {
  //     return (
  //       <div
  //         className={`p-0 ${
  //           status?.toString() === "Accepted"
  //             ? "bg-[#DCFCE7] text-[#16A34A]"
  //             : status.toString() === "Pending"
  //             ? "bg-[#FEF3C7] text-[#D97706]"
  //             : "bg-[#FEF2F2] text-[#EF4444]"
  //         } rounded shadow-md w-[80px]`}
  //       >
  //         <span className="font-medium text-xs px-2 w-full">
  //           {status?.toString() === "1" ? "Active" : "Inactive"}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
];

const StockRequest = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  return (
    <GlobalContainer
      pageTitle="Stock Request"
      columns={columns}
      selectedRows={selectedRows}
      debounce={debounce}
      setSelectedRows={setSelectedRows}
      setNewColumns={setNewColumns}
      setParams={setParams}
      api={STOCK_COUNT}
    >
      <StockRequestCreate />

      <StockRequestTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      />
    </GlobalContainer>
  );
};

export default StockRequest;
