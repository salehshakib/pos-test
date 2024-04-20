import { PageContainer } from "@ant-design/pro-layout";
import { Button } from "antd";
import {
  FaCirclePlus,
  FaDownload,
  FaEye,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaTrash,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const PageComponent = ({ pageTitle, children }) => {
  return (
    <PageContainer
      title=<div className="text-xl md:text-3xl">{pageTitle}</div>
      subTitle={
        <Button
          type="text"
          icon={<FaCirclePlus />}
          className="flex justify-center items-center text-xl md:text-3xl hover:bg-none"
        />
      }
      extra={[
        <div
          key="search"
          // type="text"
          className="px-4 py-2 w-48 border rounded-md border-gray-300 hover:border-primary-hover focus:outline-none focus:border-primary hover:cursor-pointer flex justify-between items-center"
          // placeholder="Search"
          // value={searchUser}
          // onChange={handleSearchUser}
          // suffix={
          //   <IoSearch
          //     style={{
          //       fontSize: "16px",
          //       color: "#000",
          //     }}
          //   />
          // }
          // allowClear
        >
          Search
          <IoSearch
            style={{
              fontSize: "16px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"view"}>
          <FaEye
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"download"}>
          <FaDownload
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"pdf"}>
          <FaFilePdf
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"excel"}>
          <FaFileExcel
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"csv"}>
          <FaFileCsv
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"print"}>
          <FaPrint
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        <div key={"delete"}>
          <FaTrash
            style={{
              fontSize: "24px",
              color: "#000",
            }}
            className="hover:cursor-pointer"
          />
        </div>,
        //   <Input
        //     type="text"
        //     key="search"
        //     className="px-4 w-full border  rounded-sm border-gray-300 hover:border-primary-hover focus:outline-none focus:border-primary"
        //     placeholder="Search"
        //     // value={searchUser}
        //     // onChange={handleSearchUser}
        //     suffix={
        //       <IoSearch
        //         style={{
        //           fontSize: "16px",
        //           color: "#000",
        //         }}
        //       />
        //     }
        //     allowClear
        //   />,
      ]}
    >
      {children}
    </PageContainer>
  );
};

export default PageComponent;
