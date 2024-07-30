import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PurchaseReportTable } from "../../../components/Report/PurchaseReportTable";
import { ReportContainer } from "../../../container/ReportContainer/ReportContainer";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useFilterParams } from "../../../utilities/hooks/useParams";
import { getDateRange } from "../../../utilities/lib/getDateRange";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product",
    key: "product",
    render: (product) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {product}
      </span>
    ),
  },
  {
    title: "Purchased Qty",
    dataIndex: "purchasedQty",
    key: "purchasedQty",
    render: (qty) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {qty}
      </span>
    ),
  },
  {
    title: "Purchased Amount",
    dataIndex: "purchaseAmount",
    key: "purchaseAmount",
    render: (amount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {amount}
      </span>
    ),
  },
];

export const PurchaseReport = () => {
  // const [newColumns, setNewColumns] = useState(columns);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [segment, setSegment] = useState("Weekly");

  const { searchParams, setParams } = useFilterParams();
  const user = useSelector(useCurrentUser);
  const warehouse_id = user?.warehouse_id;

  useEffect(() => {
    if (warehouse_id) {
      setParams((prev) => ({
        ...prev,
        warehouseId: warehouse_id,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouse_id]);

  const onWarehouseChange = (warehouse) => {
    setParams((prev) => ({
      ...prev,
      warehouseId: warehouse,
    }));
  };

  const onDateChange = (_, dateString) => {
    if (dateString[0] && dateString[1]) {
      setParams((prev) => ({
        ...prev,
        start_date: dateString[0],
        end_date: dateString[1],
      }));
    } else {
      const dateRange = getDateRange(segment);
      setParams((prev) => ({
        ...prev,
        start_date: dateRange[0],
        end_date: dateRange[1],
      }));
    }
  };

  const onSegmentChange = (value) => {
    setSegment(value);
  };

  useEffect(() => {
    const dateRange = getDateRange(segment);
    setParams((prev) => ({
      ...prev,
      start_date: dateRange[0],
      end_date: dateRange[1],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  return (
    <ReportContainer
      pageTitle={"Purchase Report"}
      onDateChange={onDateChange}
      segment={segment}
      onSegmentChange={onSegmentChange}
      onWarehouseChange={onWarehouseChange}
    >
      <PurchaseReportTable newColumns={columns} searchParams={searchParams} />
    </ReportContainer>
  );
};
