/* eslint-disable no-unused-vars */
import { notification } from "antd";
import MainLayout from "./layout/MainLayout";

function App() {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <MainLayout />
    </>
  );
}

export default App;
