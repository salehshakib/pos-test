import { PageContainer } from "@ant-design/pro-layout";
import { Button, Checkbox, Divider, Dropdown } from "antd";
import { useState } from "react";
import {
  FaCirclePlus,
  FaDownload,
  FaEllipsis,
  FaEye,
  FaFileCsv,
  FaFilePdf,
  FaPrint,
  FaTrash,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GlobalUtilityStyle } from "../../../container/Styled";
import CustomDrawer from "../Drawer/CustomDrawer";

// const { RangePicker } = DatePicker;
// const disabledDate = (current) => {
//   // Can not select days after today
//   return current > dayjs().endOf("day");
// };

const PageComponent = ({ pageTitle, children, drawerComponent }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  // const [isTableView, setIsTableView] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const hideDrawer = () => {
    setIsDrawerOpen(false);
  };

  const [checkedList, setCheckedList] = useState([]);

  const options = [
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
  ];

  const checkAll = options.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (list) => {
    setCheckedList(list);
    // setIsTableView(true);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : []);
  };

  const items = [
    {
      key: "view",
      label: (
        <Dropdown
          // open={isTableView}
          // onClose={() => setIsTableView(false)}
          key="dropdown"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "checkbox",
                label: (
                  <>
                    {/* <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Check all
                    </Checkbox> */}
                    {/* <Divider /> */}
                    <Checkbox.Group
                      options={options}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </>
                ),
              },
            ],
          }}
          placement="left"
        >
          <div>View</div>
        </Dropdown>
      ),
      icon: <FaEye className="text-xl" />,
    },
    {
      label: "Download",
      key: "download",
      icon: <FaDownload className="text-xl" />,
    },
    {
      //pdf
      label: "PDF",
      key: "pdf",
      icon: <FaFilePdf className="text-xl" />,
    },
    {
      //excel
      label: "Excel",
      key: "excel",
      icon: <FaFileCsv className="text-xl" />,
    },
    {
      //csv
      label: "CSV",
      key: "csv",
      icon: <FaFileCsv className="text-xl" />,
    },
    {
      label: "Print",
      key: "print",
      icon: <FaPrint className="text-xl" />,
    },
    {
      label: "Delete",
      key: "delete",
      icon: <FaTrash className="text-xl" />,
    },
  ];

  return (
    <GlobalUtilityStyle>
      <PageContainer
        title=<div className="text-2xl lg:text-3xl">{pageTitle}</div>
        subTitle=<Button
          key={"create"}
          type="text"
          icon={<FaCirclePlus className="" />}
          onClick={openDrawer}
          className="flex justify-center items-center text-2xl lg:text-3xl border-none"
        />
        // extra=<div
        //   key={"user-control"}
        //   className="flex justify-center items-center gap-2"
        // >
        // <div key={"view"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaEye className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"download"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaDownload className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"pdf"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaFilePdf className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"excel"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaDownload className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"csv"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaFileCsv className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"print"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaPrint className="lg:text-xl" />
        //   </button>
        // </div>

        // <div key={"delete"}>
        //   <button className="bg-secondary p-2 rounded-xl text-white hover:scale-110 duration-300">
        //     <FaTrash className="lg:text-xl" />
        //   </button>
        // </div>
        // </div>

        extra={[
          <div
            key="search"
            className="px-4 py-2 w-48 md:w-60 border rounded-md border-primary hover:border-primary-hover focus:outline-none focus:border-primary hover:cursor-pointer flex justify-between items-center hover:text-secondary text-md "
          >
            Search
            <IoSearch
              style={{
                color: "#000",
              }}
              className="hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
            />
          </div>,

          <Dropdown
            key="dropdown"
            menu={{
              items,
              selectable: true,
              onSelect: (value) => {
                console.log(value.key);
                if (value.key === "view") {
                  // setIsTableView(true);
                }
              },
            }}
            placement="bottomRight"
          >
            <Button style={{ padding: "0 12px" }} size="large">
              <FaEllipsis />
            </Button>
          </Dropdown>,
        ]}
      >
        {children}
        {drawerComponent && (
          <CustomDrawer
            open={isDrawerOpen}
            onClose={hideDrawer}
            title={"Login Drawer Test"}
          >
            {drawerComponent}
          </CustomDrawer>
        )}
      </PageContainer>
    </GlobalUtilityStyle>
  );
};

export default PageComponent;
