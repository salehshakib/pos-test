import { PageContainer } from "@ant-design/pro-layout";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  FaCirclePlus,
  FaDownload,
  FaEye,
  FaFileCsv,
  FaFilePdf,
  FaPrint,
  FaTrash,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const { RangePicker } = DatePicker;
const disabledDate = (current) => {
  // Can not select days after today
  return current > dayjs().endOf("day");
};

const PageComponent = ({ pageTitle, children }) => {
  return (
    <PageContainer
      title=<div className="text-xl lg:text-3xl">{pageTitle}</div>
      subTitle=<div className="flex gap-5 justify-between items-center">
        <Button
          key={"create"}
          type="text"
          icon={<FaCirclePlus className="" />}
          className="flex justify-center items-center text-xl lg:text-3xl border-none"
        />
        <div
          key="search"
          className="px-4 py-[5px] w-48 border rounded-md border-primary hover:border-primary-hover focus:outline-none focus:border-primary hover:cursor-pointer flex justify-between items-center hover:text-secondary text-sm "
        >
          Search
          <IoSearch
            style={{
              color: "#000",
            }}
            className="hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
          />
        </div>
        <div key={"date"} className="w-60">
          <RangePicker
            className="w-full"
            disabledDate={disabledDate}
            allowClear
          />
        </div>
      </div>
      extra=<div
        key={"user-control"}
        className="flex justify-center items-center gap-2"
      >
        <div key={"view"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaEye className="lg:text-xl" />
          </button>
        </div>

        <div key={"download"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaDownload className="lg:text-xl" />
          </button>
        </div>

        <div key={"pdf"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaFilePdf className="lg:text-xl" />
          </button>
        </div>

        <div key={"excel"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaDownload className="lg:text-xl" />
          </button>
        </div>

        <div key={"csv"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaFileCsv className="lg:text-xl" />
          </button>
        </div>

        <div key={"print"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaPrint className="lg:text-xl" />
          </button>
        </div>

        <div key={"delete"}>
          <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
            <FaTrash className="lg:text-xl" />
          </button>
        </div>
      </div>
    >
      {children}
    </PageContainer>
  );
};

export default PageComponent;
