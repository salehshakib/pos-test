import { Descriptions, Row, Spin, Tabs } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { WarehouseFilter } from "../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { rowLayout } from "../../../layout/FormLayout";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useGetWarehouseDetailsQuery } from "../../../redux/services/warehouse/warehouseApi";
import createDetailsLayout from "../../../utilities/lib/createDetailsLayout";
import { SaleTable } from "./data/components/SaleTable";

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter fullLayout={true} />
    </Row>
  );
};

export const WarehouseReport = () => {
  const user = useSelector(useCurrentUser);

  const { data, isFetching } = useGetWarehouseDetailsQuery(
    {
      id: user?.warehouse_id,
    },
    { skip: !user?.warehouse_id }
  );

  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);
  const { keyword, debounce } = useDebounce();

  const summaryDetails = createDetailsLayout(summaryData);

  const warehouseItems = [
    {
      key: "1",
      label: "Warehouse",
      children: data?.name,
      span: 24,
    },
    {
      key: "2",
      label: "Email",
      children: data?.email,
      span: 24,
    },
    {
      key: "3",
      label: "Phone Number",
      children: data?.phone,
      span: 24,
    },
    {
      key: "5",
      label: "Address",
      children: data?.address,
      span: 24,
    },
  ];

  return (
    // <ReportContainer pageTitle="Warehouse Report">
    <GlobalContainer
      pageTitle="Warehouse Report"
      popoverWidth={400}
      searchFilterContent={<SearchFilterComponent />}
      //   columns={columns}
      //   selectedRows={selectedRows}
      debounce={debounce}
      //   setSelectedRows={setSelectedRows}
      //   setNewColumns={setNewColumns}
      //   setParams={setParams}
      //   api={BRAND}
    >
      <div className=" w-full grid grid-cols-2 gap-4 mb-5">
        <div className="border rounded-md p-4 shadow-sm">
          {isFetching ? (
            <Spin className="w-full h-full flex justify-center items-center " />
          ) : (
            <Descriptions
              title="Warehouse Details"
              layout=""
              items={warehouseItems}
            />
          )}
        </div>
        <div className="border rounded-md p-4 shadow-sm">
          {isFetching ? (
            <Spin className="w-full h-full flex justify-center items-center " />
          ) : (
            <Descriptions title="Summary" items={summaryDetails} />
          )}
        </div>
      </div>
      <Tabs
        defaultActiveKey="sale"
        items={[
          {
            label: "Sale",
            key: "sale",
            children: (
              <SaleTable keyword={keyword} warehouse_ids={[data?.id]} />
            ),
          },
          {
            label: "Purchase",
            key: "purchase",
            // children: <PurchaseTable />,
          },
          {
            label: "Quotation",
            key: "quotation",
            // children: <QuotationTable />,
          },
          {
            label: "Return",
            key: "return",
            // children: <ReturnTable />,
          },
          {
            label: "Expense",
            key: "expense",
            children: <p>Content of Tab Pane 3</p>,
          },
        ]}
      />
    </GlobalContainer>

    // </ReportContainer>
  );
};
