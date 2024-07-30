import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomCalender from "../../../components/Shared/Calender/Calender";
import { ReportContainer } from "../../../container/ReportContainer/ReportContainer";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useGetAllPurchaseQuery } from "../../../redux/services/purchase/purchaseApi";

export const PurchaseCalender = () => {
  const user = useSelector(useCurrentUser);

  const warehouse_id = user?.warehouse_id;

  const [dateRange, setDateRange] = useState([]);
  const [warehouseId, setWarehouseId] = useState(undefined);

  useEffect(() => {
    if (warehouse_id) setWarehouseId(warehouse_id);
  }, [warehouse_id]);

  const onWarehouseChange = (warehouse) => {
    setWarehouseId(warehouse);
  };

  useEffect(() => {
    const currentDate = dayjs();
    const startOfMonth = currentDate.startOf("month").format("YYYY-MM-DD");
    const endOfMonth = currentDate.endOf("month").format("YYYY-MM-DD");
    setDateRange([startOfMonth, endOfMonth]);
  }, []);

  const onChange = (date) => {
    const newDate = dayjs(date);

    const startOfMonth = newDate.startOf("month").format("YYYY-MM-DD");

    const endOfMonth = newDate.endOf("month").format("YYYY-MM-DD");

    setDateRange([startOfMonth, endOfMonth]);
  };

  const { data } = useGetAllPurchaseQuery({
    params: {
      start_date: dateRange[0],
      end_date: dateRange[1],
      warehouse_id: warehouseId,
      group_by: "created_at",
      child: 1,
    },
  });

  console.log(data);

  return (
    <ReportContainer
      pageTitle="Purchase Calender"
      onWarehouseChange={onWarehouseChange}
    >
      <CustomCalender onChange={onChange} data={data?.results?.purchase} />
    </ReportContainer>
  );
};
