import { Outlet } from "react-router-dom";
import Header from "../components/AllSection/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
