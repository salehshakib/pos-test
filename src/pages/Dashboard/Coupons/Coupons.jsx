import { useState } from "react";
import CouponsCreate from "../../../components/Coupons/CouponsCreate";
import CouponsTable from "../../../components/Coupons/CouponsTable";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";

const columns = [
  {
    title: "Coupon Code",
    dataIndex: "couponCode",
    key: "couponCode",
    align: "center",
    render: (couponCode) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {couponCode}
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
  {
    title: "Minimum Amount",
    dataIndex: "minimumAmount",
    key: "minimumAmount",
    align: "center",
    render: (minimumAmount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {minimumAmount}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    render: (quantity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {quantity}
      </span>
    ),
  },
  {
    title: "Available",
    dataIndex: "available",
    key: "available",
    align: "center",
    render: (available) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {available}
      </span>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    align: "center",
    render: (createdBy) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {createdBy}
      </span>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    render: (createdAt) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {createdAt}
      </span>
    ),
  },
  {
    title: "Expired At",
    dataIndex: "expiredAt",
    key: "expiredAt",
    align: "center",
    render: (expiredAt) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {expiredAt}
      </span>
    ),
  },
];

const Coupons = () => {
  const [newColumns, setNewColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <GlobalContainer
      pageTitle="Coupons"
      columns={columns}
      selectedRows={selectedRows}
      setNewColumns={setNewColumns}
    >
      <CouponsCreate />

      <CouponsTable newColumns={newColumns} setSelectedRows={setSelectedRows} />
    </GlobalContainer>
  );
};

export default Coupons;
