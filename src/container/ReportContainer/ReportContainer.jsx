import { PageContainer } from "@ant-design/pro-layout";
import { Button, Input, Popover, Space } from "antd";
import { IoSearch } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";
import { GlobalUtilityStyle } from "../Styled";
import { FilterDateRange } from "../../components/ReusableComponent/FilterDateRange";

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
          }}
          extra={[
            <Space key="search" className="flex items-center">
              {/* <Space.Compact>
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
              </Space.Compact> */}
              <FilterDateRange customStyle={true} />
            </Space>,
          ]}
          content={children}
        />
      </div>
    </GlobalUtilityStyle>
  );
};
