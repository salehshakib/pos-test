import { Descriptions, Row, Spin, Tabs } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { WarehouseFilter } from "../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { rowLayout } from "../../../layout/FormLayout";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";
import { useGetWarehouseDetailsQuery } from "../../../redux/services/warehouse/warehouseApi";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";
import { useFilterParams } from "../../../utilities/hooks/useParams";
import createDetailsLayout from "../../../utilities/lib/createDetailsLayout";
import { ExpenseTable } from "./components/ExpenseTable";
import { PurchaseReturnTable } from "./components/PurchaseReturnTable";
import { PurchaseTable } from "./components/PurchaseTable";
import { QuotationTable } from "./components/QutationTable";
import { SaleReturnTable } from "./components/SaleReturnTable";
import { SaleTable } from "./components/SaleTable";

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <WarehouseFilter fullLayout={true} multiple={false} />
    </Row>
  );
};

export const WarehouseReport = () => {
  const user = useSelector(useCurrentUser);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const { data, isFetching } = useGetWarehouseDetailsQuery(
    {
      id: user?.warehouse_id,
    },
    { skip: !user?.warehouse_id }
  );

  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);

  const summaryDetails = createDetailsLayout(summaryData);

  const summaryType = {
    warehouse_ids: [
      searchParams?.warehouse_ids ? searchParams?.warehouse_ids : data?.id,
    ],
  };

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
    <GlobalContainer
      pageTitle="Warehouse Report"
      popoverWidth={400}
      searchFilterContent={<SearchFilterComponent />}
      debounce={debounce}
      setParams={setParams}
    >
      <div className=" w-full grid grid-cols-2 gap-4 mb-5">
        <div className="border rounded-md p-4 shadow-sm">
          {isFetching ? (
            <Spin className="w-full h-full flex justify-center items-center py-5" />
          ) : (
            <Descriptions
              title="Warehouse Details"
              layout=""
              items={warehouseItems}
            />
          )}
        </div>
        <div className="border rounded-md p-4 shadow-sm">
          {isFetching || loading ? (
            <Spin className="w-full h-full flex justify-center items-center " />
          ) : (
            <Descriptions title="Summary" items={summaryDetails} />
          )}
        </div>
      </div>
      {data ? (
        <Tabs
          defaultActiveKey="sale"
          items={[
            {
              label: "Sale",
              key: "sale",
              children: (
                <SaleTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
            {
              label: "Purchase",
              key: "purchase",
              children: (
                <PurchaseTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
            {
              label: "Quotation",
              key: "quotation",
              children: (
                <QuotationTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
            {
              label: "Purchase Return",
              key: "purchasereturn",
              children: (
                <PurchaseReturnTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
            {
              label: "Sale Return",
              key: "salereturn",
              children: (
                <SaleReturnTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
            {
              label: "Expense",
              key: "expense",
              children: (
                <ExpenseTable
                  keyword={keyword}
                  summaryType={summaryType}
                  setSummaryData={setSummaryData}
                  setLoading={setLoading}
                />
              ),
            },
          ]}
        />
      ) : (
        <Spin className="w-full h-full flex justify-center items-center py-10" />
      )}
    </GlobalContainer>
  );
};
