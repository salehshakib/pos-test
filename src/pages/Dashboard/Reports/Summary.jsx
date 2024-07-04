import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReportContainer } from "../../../container/ReportContainer/ReportContainer";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { getLastWeek } from "../../../utilities/lib/getLastWeek";
import { Form } from "antd";

export const Summary = () => {
  const [reportForm] = Form.useForm();
  const user = useSelector(useCurrentUser);

  const [dateRange, setDateRange] = useState();
  const [warehouse, setWarehouse] = useState(undefined);

  useEffect(() => {
    if (user?.warehouse_id) {
      reportForm.setFieldsValue({
        warehouse_id: user?.warehouse_id.toString(),
      });
      setWarehouse(user?.warehouse_id.toString());
    }

    const lastWeek = getLastWeek();

    reportForm.setFieldsValue({
      daterange: lastWeek,
    });
  }, [reportForm, user?.warehouse_id]);

  const onDateChange = (dates, dateStrings) => {
    setDateRange(dateStrings);
  };

  const onWarehouseChange = (warehouse) => {
    setWarehouse(warehouse);
  };

  const params = {
    daterange: dateRange,
    warehouse_id: warehouse,
  };

  return (
    <ReportContainer
      pageTitle="Summary"
      form={reportForm}
      onDateChange={onDateChange}
      onWarehouseChange={onWarehouseChange}
    >
      {/* <Calendar cellRender={cellRender} /> */}
    </ReportContainer>
  );
};
