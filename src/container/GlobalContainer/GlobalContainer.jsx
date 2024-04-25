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

const GlobalContainer = ({
  pageTitle,
  columns = [],
  selectedRows,
  children,
  setNewColumns,
  searchFilterContent,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [checkedMenuOpen, setCheckedMenuOpen] = useState(false);

  const handleDrawerOpen = () => {
    dispatch(openCreateDrawer());
  };

  const handleMenuClick = (e) => {
    if (e.key !== "tableColumns") {
      setCheckedMenuOpen(false);
    }
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

  const items = [
    {
      key: "view",
      label: (
        <Dropdown
          open={checkedMenuOpen}
          onOpenChange={handleCheckedOpenChange}
          key="dropdown"
          menu={{
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
      <div className="h-full ">
        <PageContainer
          title=<div className="text-2xl lg:text-3xl">{pageTitle}</div>
          subTitle=<div className="">
            <Button
              key={"create"}
              type="text"
              icon={<FaCirclePlus className="text-2xl lg:text-3xl w-full " />}
              onClick={handleDrawerOpen}
              className="flex justify-center items-center border-none w-full text-secondary"
            />
          </div>
          extra={[
            <Space key="search">
              <Space.Compact>
                <Input
                  type="text"
                  key="search"
                  size="large"
                  className="w-full border rounded-md border-gray-300 hover:border-primary-hover focus:outline-none focus:border-primary"
                  placeholder="Search"
                  // value={searchUser}
                  // onChange={handleSearchUser}
                  prefix={
                    <IoSearch
                      style={{
                        fontSize: "16px",
                        color: "#000",
                      }}
                      className="hover:cursor-pointer hover:scale-110 duration-300 text-xs lg:text-[16px]"
                    />
                  }
                  allowClear
                />
                <Popover
                  content={searchFilterContent}
                  title="Advance Search"
                  trigger="click"
                  placement="bottomRight"
                  arrow={false}
                >
                  <Button
                    key="filter"
                    size="large"
                    className="hover:bg-white border border-gray-300 hover:border-primary-hover  "
                    type="text"
                  >
                    <TbFilterSearch
                      style={{
                        fontSize: "16px",
                        color: "#000",
                      }}
                      className="hover:scale-110 duration-300 text-xs lg:text-[16px]"
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
                <button className="bg-secondary p-2 rounded-xl  text-white hover:scale-110 duration-300 ">
                  <FaTrash className="lg:text-xl" />
                </button>
              </div>
            ),
          ]}
        >
          {children}
        </PageContainer>
      </div>
    </GlobalUtilityStyle>
  );
};

export default GlobalContainer;
