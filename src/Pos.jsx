/* eslint-disable no-unused-vars */
import { notification } from "antd";
import PosLayout from "./layout/PosLayout";

function Pos() {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <PosLayout />
    </>
  );
}

export default Pos;
