import { Badge, Calendar, Spin } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useCurrency } from "../../../redux/services/pos/posSlice";
import { showCurrency } from "../../../utilities/lib/currency";
import { useState } from "react";
import CustomModal from "../Modal/CustomModal";

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

const CustomCalender = ({ onChange, data, onCellClick }) => {
  const currency = useSelector(useCurrency);

  console.log(data);

  const getListData = (value) => {
    const date = dayjs(value).format("YYYY-MM-DD");

    let listData =
      data &&
      data[date]?.map((item) => {
        return {
          id: item?.id,
          type: item.payment_status === "Paid" ? "success" : "warning",
          content:
            showCurrency(item?.grand_total, currency) +
            " " +
            "Qty: " +
            item?.total_qty,
          products: item?.purchase_products
            ? item?.purchase_products
            : item?.sale_products,
        };
      });

    if (data) return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => {
          return (
            <li key={item.id}>
              <Badge status={item.type} text={item.content} />
              {/* <div className="flex flex-wrap gap-1">
                <span className="font-semibold">Products:</span>
                {item.products.map((productItem) => {
                  return (
                    <span key={productItem.id}>
                      {productItem?.products?.name}
                    </span>
                  );
                })}
              </div> */}
            </li>
          );
        })}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleCellClick = (date) => {
    console.log(dayjs(date).format("YYYY-MM-DD"));

    const value = data[dayjs(date).format("YYYY-MM-DD")];
    console.log(value);

    if (value) {
      setModalOpen(true);
    }
  };

  console.log(modalOpen);

  if (!data)
    return (
      // <Skeleton
      //   className="my-4"
      //   paragraph={{
      //     rows: 6,
      //   }}
      //   active
      // />
      <Spin className="w-full flex justify-center items-center h-[70vh]" />
    );

  return (
    <>
      <Calendar
        cellRender={cellRender}
        onChange={onChange}
        onSelect={handleCellClick}
      />
      <CustomModal
        openModal={modalOpen}
        hideModal={() => setModalOpen(false)}
      ></CustomModal>
    </>
  );
};

export default CustomCalender;
