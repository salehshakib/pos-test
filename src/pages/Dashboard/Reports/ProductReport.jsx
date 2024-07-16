import { Button, Col, Descriptions, Form, Row, Spin, Tabs } from "antd";
import parse from "html-react-parser";
import { useState } from "react";
import { ProductFilter } from "../../../components/ReusableComponent/SearchFormComponents/SearchFormComponent";
import CustomForm from "../../../components/Shared/Form/CustomForm";
import CustomModal from "../../../components/Shared/Modal/CustomModal";
import CustomSelect from "../../../components/Shared/Select/CustomSelect";
import GlobalContainer from "../../../container/GlobalContainer/GlobalContainer";
import { fullColLayout, rowLayout } from "../../../layout/FormLayout";
import {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
} from "../../../redux/services/product/productApi";
import { useCustomDebounce } from "../../../utilities/hooks/useDebounce";
import {
  DEFAULT_SELECT_VALUES,
  useFilterParams,
  useGlobalParams,
} from "../../../utilities/hooks/useParams";
import createDetailsLayout from "../../../utilities/lib/createDetailsLayout";
import { getLastWeek } from "../../../utilities/lib/getLastWeek";
import { ExpenseTable } from "./components/ExpenseTable";
import { PurchaseReturnTable } from "./components/PurchaseReturnTable";
import { PurchaseTable } from "./components/PurchaseTable";
import { QuotationTable } from "./components/QutationTable";
import { SaleReturnTable } from "./components/SaleReturnTable";
import { SaleTable } from "./components/SaleTable";

const SearchFilterComponent = () => {
  return (
    <Row {...rowLayout}>
      <ProductFilter fullLayout={true} multiple={false} />
    </Row>
  );
};

const SupplierModal = ({ setSupplierId, open, setOpen }) => {
  const [productForm] = Form.useForm();

  const hideModal = () => {
    setOpen(false);
  };

  const params = useGlobalParams({
    selectValue: DEFAULT_SELECT_VALUES,
  });

  const { data, isLoading } = useGetAllProductsQuery({ params });

  const options = data?.results?.product?.map((product) => ({
    value: product?.id?.toString(),
    label: product?.name,
  }));

  const handleSubmit = (values) => {
    console.log(values);
    setSupplierId(values?.product_id);
    hideModal();
  };

  return (
    <CustomModal
      title="Select Product"
      openModal={open}
      hideModal={hideModal}
      showCloseButton={false}
      width={600}
    >
      <CustomForm
        Form={productForm}
        submitBtn={false}
        handleSubmit={handleSubmit}
      >
        <Row {...rowLayout}>
          <Col {...fullColLayout}>
            <CustomSelect
              // label="Supplier"
              placeholder={"Product"}
              options={options}
              isLoading={isLoading}
              required={true}
              name={"product_id"}
            />
          </Col>

          <Col {...fullColLayout}>
            <div className={`w-full flex gap-3 justify-end items-center py-5`}>
              <Button htmlType="submit" type="primary">
                Ok
              </Button>
            </div>
          </Col>
        </Row>
      </CustomForm>
    </CustomModal>
  );
};

export const ProductReport = () => {
  // const [newColumns, setNewColumns] = useState(columns);
  // const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(true);
  const [productId, setProductId] = useState(undefined);

  const { searchParams, setParams } = useFilterParams();
  const { keyword, debounce } = useCustomDebounce();

  const { data, isFetching } = useGetProductDetailsQuery(
    {
      id: productId,
    },
    { skip: !productId }
  );

  console.log(data);

  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(false);

  const summaryDetails = createDetailsLayout(summaryData);

  const summaryType = {
    warehouse_ids: searchParams?.warehouse_ids
      ? searchParams?.warehouse_ids
      : data?.id,

    start_date:
      searchParams?.created_daterange?.[0] ??
      getLastWeek()[0].format("YYYY-MM-DD"),
    end_date:
      searchParams?.created_daterange?.[1] ??
      getLastWeek()[1].format("YYYY-MM-DD"),
  };

  const props = {
    keyword,
    summaryType,
    setSummaryData,
    setLoading,
  };

  return (
    <GlobalContainer
      pageTitle="Product Report"
      // columns={columns}
      popoverWidth={400}
      searchFilterContent={<SearchFilterComponent />}
      // selectedRows={selectedRows}
      debounce={debounce}
      // setSelectedRows={setSelectedRows}
      // setNewColumns={setNewColumns}
      setParams={setParams}
      // searchFilterContent={<SearchComponent />}
      // api={PRODUCT}
    >
      {!productId ? (
        <>
          <SupplierModal
            setSupplierId={setProductId}
            open={open}
            setOpen={setOpen}
          />
          <div className="w-full flex justify-center items-center py-5">
            <Button onClick={() => setOpen(true)}>Select Product</Button>
          </div>
        </>
      ) : (
        <>
          <div className=" w-full grid grid-cols-2 gap-4 mb-5">
            <div className="border rounded-md p-4 shadow-sm">
              {isFetching ? (
                <Spin className="w-full h-full flex justify-center items-center py-5" />
              ) : (
                <Descriptions title="Product Details" layout="">
                  <Descriptions.Item label="Product" key={1} span={24}>
                    <div>{data?.name}</div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Sku" key={2} span={24}>
                    <div>{data?.sku}</div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Type" key={3} span={24}>
                    <div>{data?.type}</div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Details" key={4} span={24}>
                    <div>{parse(data?.details)}</div>
                  </Descriptions.Item>
                </Descriptions>
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
                  children: <SaleTable {...props} summary={"product,sale"} />,
                },
                {
                  label: "Purchase",
                  key: "purchase",
                  children: (
                    <PurchaseTable {...props} summary={"product,purchase"} />
                  ),
                },
                {
                  label: "Quotation",
                  key: "quotation",
                  children: (
                    <QuotationTable {...props} summary={"product,quotation"} />
                  ),
                },
                {
                  label: "Purchase Return",
                  key: "purchasereturn",
                  children: (
                    <PurchaseReturnTable
                      {...props}
                      summary={"product,purchasereturn"}
                    />
                  ),
                },
                {
                  label: "Sale Return",
                  key: "salereturn",
                  children: (
                    <SaleReturnTable
                      {...props}
                      summary={"product,salereturn"}
                    />
                  ),
                },
                {
                  label: "Expense",
                  key: "expense",
                  children: (
                    <ExpenseTable {...props} summary={"product,expense"} />
                  ),
                },
              ]}
            />
          ) : (
            <Spin className="w-full h-full flex justify-center items-center py-10" />
          )}
        </>
      )}

      {/* <ProductReportTable
        newColumns={newColumns}
        keyword={keyword}
        setSelectedRows={setSelectedRows}
        searchParams={searchParams}
      /> */}
    </GlobalContainer>
  );
};
