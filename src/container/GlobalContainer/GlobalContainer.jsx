import { PageContainer } from "@ant-design/pro-layout";
import { Button, Checkbox, Dropdown, Input, Popover, Space } from "antd";
import { useEffect, useState } from "react";
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
import { TbFilterSearch } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { openCreateDrawer } from "../../redux/services/drawer/drawerSlice";
import { GlobalUtilityStyle } from "../Styled";
import { useLocation } from "react-router-dom";

const GlobalContainer = ({
  pageTitle,
  columns = [],
  selectedRows,
  children,
  setNewColumns,
  searchFilterContent,
  handleExport,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [checkedMenuOpen, setCheckedMenuOpen] = useState(false);

  const handleDrawerOpen = () => {
    dispatch(openCreateDrawer());
  };

  const handleMenuClick = (e) => {
    if (e.key !== "tableColumns") {
      setCheckedMenuOpen(false);
    }

    //console.log(e);
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleCheckedOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setCheckedMenuOpen(nextOpen);
    }
  };

  const defaultCheckedList = columns?.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  useEffect(() => {
    const newColumns = columns?.map((item) => ({
      ...item,
      hidden: !checkedList.includes(item.key),
    }));

    setNewColumns(newColumns);
  }, [checkedList, columns, setNewColumns]);

  const onChange = (list) => {
    setCheckedList(list);
  };

  const menu = {
    onClick: handleMenuClick,
    className: "-translate-x-[34px] translate-y-1/4",
    items: [
      {
        key: "tableColumns",
        label: (
          <Checkbox.Group
            className="flex flex-col"
            options={options}
            value={checkedList}
            onChange={onChange}
          />
        ),
      },
    ],
  };

  const items = [
    {
      key: "view",
      label: (
        <Dropdown
          open={checkedMenuOpen}
          onOpenChange={handleCheckedOpenChange}
          key="dropdown"
          menu={menu}
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
      // onClick: () => handleExport("pdf"),
      icon: <FaFilePdf className="text-xl" />,
    },
    {
      //excel
      label: "Excel",
      key: "excel",
      onClick: () => handleExport("excel"),
      icon: <FaFileCsv className="text-xl" />,
    },
    {
      //csv
      label: "CSV",
      key: "csv",
      onClick: () => handleExport("csv"),
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
      <div className="h-full">
        <PageContainer
          header={{
            title: <div className="text-2xl lg:text-3xl py-3">{pageTitle}</div>,
            subTitle: (
              <>
                {!["/petty-cash", "/reports"].some((path) =>
                  pathname.includes(path)
                ) && (
                  <div className="w-full">
                    <Button
                      key={"create"}
                      type="text"
                      icon={<FaCirclePlus size={28} />}
                      style={{
                        width: "45px",
                        height: "100%",
                      }}
                      onClick={handleDrawerOpen}
                      className="primary-text flex justify-center items-center"
                    />
                  </div>
                )}
              </>
            ),
          }}
          extra={[
            <Space key="search">
              <Space.Compact>
                <Input
                  type="text"
                  key="search"
                  size="large"
                  className="w-full border rounded-md border-gray-300 focus:outline-none focus:border-primary"
                  placeholder="Search"
                  // value={searchUser}
                  // onChange={handleSearchUser}
                  prefix={
                    <IoSearch
                      style={{
                        fontSize: "16px",
                      }}
                      className="primary-text hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
                    />
                  }
                  allowClear={true}
                />
                <Popover
                  content={searchFilterContent}
                  title={<div className="text-center">Advance Search</div>}
                  style={
                    {
                      // width: "300px"
                    }
                  }
                  trigger="click"
                  placement="bottomRight"
                  arrow={false}
                >
                  <Button
                    key="filter"
                    size="large"
                    className="border border-gray-300 "
                    type="text"
                  >
                    <TbFilterSearch
                      style={{
                        fontSize: "16px",
                        // color: "#000",
                      }}
                      className="text-xs primary-text lg:text-[16px]"
                    />
                  </Button>
                </Popover>
              </Space.Compact>
            </Space>,

            <Dropdown
              key="dropdown"
              trigger={["click"]}
              open={open}
              onOpenChange={handleOpenChange}
              menu={{
                items,
                selectable: true,
                onSelect: (value) => {
                  if (value.key !== "view") {
                    setOpen(false);
                  }
                },
              }}
              placement="bottomRight"
            >
              <Button style={{ padding: "0 12px" }} size="large">
                <FaEllipsis />
              </Button>
            </Dropdown>,

            selectedRows?.length !== 0 && (
              <div key={"delete"}>
                <button className="custom-primary-btn p-2 rounded-xl text-white duration-300 ">
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ),
          ]}
          content={children}
        />
        {/* <div className="">{children}</div> */}
        {/* </PageContainer> */}
      </div>
    </GlobalUtilityStyle>
  );
};

export default GlobalContainer;
