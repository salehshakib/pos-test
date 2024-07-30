import { Badge, Calendar } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReportContainer } from "../../../container/ReportContainer/ReportContainer";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useGetAllSaleQuery } from "../../../redux/services/sale/saleApi";

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

export const SaleCalender = () => {
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

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
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

  const { data } = useGetAllSaleQuery({
    params: {
      start_date: dateRange[0],
      end_date: dateRange[1],
      warehouse_id: warehouseId,
      group_by: "created_at",
    },
  });

  console.log(data);

  return (
    <ReportContainer
      pageTitle="Sale Calender"
      onWarehouseChange={onWarehouseChange}
    >
      <Calendar cellRender={cellRender} onChange={onChange} />
    </ReportContainer>
  );
};
