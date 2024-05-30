import { InfoCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Col, Form, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import { GlobalUtilityStyle } from "../../container/Styled";

import { useGetAllCashierQuery } from "../../redux/services/cashier/cashierApi";
import { useGetAllCurrencyQuery } from "../../redux/services/currency/currencyApi";
import { useGetAllCustomerQuery } from "../../redux/services/customer/customerApi";
import { useGetAllProductsQuery } from "../../redux/services/product/productApi";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomerCreate from "../Customer/CustomerCreate";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";
import ProductTableComponent from "./PosProductTableComponent";

const WarehouseComponent = () => {
  const form = Form.useFormInstance();
  const { data, isLoading } = useGetWarehousesQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.warehouse?.map((warehouse) => ({
    value: warehouse.id?.toString(),
    label: warehouse.name,
  }));

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue("warehouse", options[0].value);
    }
  }, [form, options]);

  return (
    <CustomSelect
      placeholder={"Warehouse"}
      showSearch={true}
      isLoading={isLoading}
      options={options}
      required={true}
      name="warehouse"
    />
  );
};

const CashierComponent = () => {
  const form = Form.useFormInstance();
  const { data, isLoading } = useGetAllCashierQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.cashier?.map((cashier) => ({
    value: cashier.id?.toString(),
    label: cashier.name,
  }));

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue("cashier", options[0].value);
    }
  }, [form, options]);

  return (
    <CustomSelect
      placeholder={"Cashier"}
      showSearch={true}
      isLoading={isLoading}
      options={options}
      required={true}
      name="cashier"
    />
  );
};

const CustomerComponent = () => {
  const form = Form.useFormInstance();
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const { data, isLoading } = useGetAllCustomerQuery({
    params: {
      selectValue: ["id", "name"],
    },
  });

  const options = data?.results?.customer?.map((customer) => ({
    value: customer.id?.toString(),
    label: customer.name,
  }));

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue("customer", options[0].value);
    }
  }, [form, options]);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        placeholder={"customer"}
        showSearch={true}
        isLoading={isLoading}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        required={true}
        name="customer"
      />

      <CustomerCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};

const CurrencyComponent = () => {
  const form = Form.useFormInstance();
  const { data, isLoading } = useGetAllCurrencyQuery({
    params: {
      selectValue: ["id", "name", "is_default"],
    },
  });

  const options = data?.results?.currency?.map((currency) => ({
    value: currency.id?.toString(),
    label: currency.name,
  }));

  useEffect(() => {
    if (options?.length) {
      form.setFieldValue("currency", options[0].value);
    }
  }, [form, options]);

  return (
    <CustomSelect
      placeholder={"currency"}
      showSearch={true}
      isLoading={isLoading}
      options={options}
      required={true}
      name="currency"
    />
  );
};

const CurrencyExchangeComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("exchange_rate", 1);
  }, [form]);

  const content = (
    <Tooltip title="Cuurency Exchange Rate">
      <InfoCircleOutlined
        style={{
          color: "rgba(0,0,0,.45)",
        }}
      />
    </Tooltip>
  );

  return (
    <CustomInput
      type={"number"}
      required={true}
      name={"exchange_rate"}
      suffix={content}
    />
  );
};

const SearchProductComponent = () => {
  const [keyword, setKeyword] = useState(null);
  const [value, setValue] = useState(null);

  const debounce = useDebouncedCallback(async (value) => {
    if (value.trim() !== "") {
      setKeyword(value);
    }
  }, 1000);

  const { data, isFetching } = useGetAllProductsQuery(
    {
      params: {
        selectValue: ["id", "name", "sku", "buying_price"],
        keyword,
      },
    },
    {
      skip: !keyword,
    }
  );

  const options =
    data?.results?.product?.map((product) => ({
      value: product.id.toString(),
      label: product.name,
    })) ?? [];

  const onSelect = (value, option) => {
    console.log(value, option);
    setValue(null);
  };

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <AutoComplete
      options={options}
      className="mt-1 w-full"
      size="large"
      onSelect={onSelect}
      onSearch={debounce}
      value={value}
      onChange={onChange}
      placeholder="Search Product"
      suffixIcon={<FaSearch />}
      allowClear
    />
  );
};

const colLayout = {
  xs: 24,
  md: 12,
  xl: 8,
};

const fullColLayout = {
  xs: 24,
};

const RegisterForm = () => {
  const [form] = Form.useForm();

  return (
    <GlobalUtilityStyle>
      <Form form={form} layout="vertical" autoComplete="on" scrollToFirstError>
        <div className="flex flex-col">
          <Row gutter={10}>
            <Col {...colLayout}>
              <CustomDatepicker />
            </Col>
            <Col {...colLayout}>
              <CustomInput
                type={"text"}
                required={true}
                placeholder={"Reference Number"}
              />
            </Col>
            <Col {...colLayout}>
              <WarehouseComponent />
            </Col>
            <Col {...colLayout}>
              <CashierComponent />
            </Col>
            <Col {...colLayout}>
              <CustomerComponent />
            </Col>
            <Col {...colLayout}>
              <Row gutter={5}>
                <Col xs={18}>
                  <CurrencyComponent />
                </Col>
                <Col xs={6}>
                  <CurrencyExchangeComponent />
                </Col>
              </Row>
            </Col>
            <Col {...fullColLayout}>
              <SearchProductComponent />
            </Col>
          </Row>
          {/* <Row className="">
            <Col {...fullColLayout}>
            </Col>
          </Row> */}
        </div>

        {/* {submitBtn && (
          <FormButton loading={isLoading} onClose={onClose}>
            {submitBtnText}
          </FormButton>
        )} */}
      </Form>
    </GlobalUtilityStyle>
  );
};

export const PosRegister = () => {
  return (
    <div className="p-4 flex flex-col gap-5 h-full">
      <div>
        <RegisterForm />
      </div>
      <div className="grow">
        <ProductTableComponent />
      </div>
    </div>
  );
};
