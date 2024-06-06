import { PageContainer } from "@ant-design/pro-layout";
import { Button, Input, Popover, Space } from "antd";
import { IoSearch } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";
import { GlobalUtilityStyle } from "../Styled";

export const ReportContainer = ({
  pageTitle,
  searchFilterContent,
  children,
}) => {
  return (
    <GlobalUtilityStyle>
      <div className="h-full">
        <PageContainer
          header={{
            title: <div className="text-2xl lg:text-3xl py-3">{pageTitle}</div>,
            //   subTitle: (
            //     <>
            //       {!pathname.includes("/petty-cash") && (
            //         <div className="w-full">
            //           <Button
            //             key={"create"}
            //             type="text"
            //             icon={<FaCirclePlus size={28} />}
            //             style={{
            //               width: "45px",
            //               height: "100%",
            //             }}
            //             onClick={handleDrawerOpen}
            //             className="primary-text flex justify-center items-center"
            //           />
            //         </div>
            //       )}
            //     </>
            //   ),
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
                  title="Advance Search"
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

            //   <Dropdown
            //     key="dropdown"
            //     trigger={["click"]}
            //     open={open}
            //     onOpenChange={handleOpenChange}
            //     menu={{
            //       items,
            //       selectable: true,
            //       onSelect: (value) => {
            //         if (value.key !== "view") {
            //           setOpen(false);
            //         }
            //       },
            //     }}
            //     placement="bottomRight"
            //   >
            //     <Button style={{ padding: "0 12px" }} size="large">
            //       <FaEllipsis />
            //     </Button>
            //   </Dropdown>,

            //   selectedRows?.length !== 0 && (
            //     <div key={"delete"}>
            //       <button className="custom-primary-btn p-2 rounded-xl text-white duration-300 ">
            //         <FaTrash className="text-xl" />
            //       </button>
            //     </div>
            //   ),
          ]}
          content={children}
        />
      </div>
    </GlobalUtilityStyle>
  );
};
