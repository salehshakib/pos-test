import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { GlobalUtilityStyle } from "../../container/Styled";

import dayjs from "dayjs";
import { useGetAllCashierQuery } from "../../redux/services/cashier/cashierApi";
import { useGetAllCurrencyQuery } from "../../redux/services/currency/currencyApi";
import { useGetAllCustomerQuery } from "../../redux/services/customer/customerApi";
import { useGetWarehousesQuery } from "../../redux/services/warehouse/warehouseApi";
import CustomerCreate from "../Customer/CustomerCreate";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomInput from "../Shared/Input/CustomInput";
import CustomModal from "../Shared/Modal/CustomModal";
import { SearchProduct } from "../Shared/ProductControllerComponent/SearchProduct";
import CustomSelect from "../Shared/Select/CustomSelect";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";
import ProductTableComponent from "./PosProductTableComponent";
import { colLayout } from "../../layout/FormLayout";

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
      placeholder={"Exchange Rate"}
      suffix={content}
    />
  );
};

const RegisterForm = ({ products, setProducts }) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    const currentDate = dayjs(new Date());
    form.setFieldValue("sale_at", currentDate);
  }, [form]);
  return (
    <GlobalUtilityStyle className="pb-5">
      <div className="flex flex-col">
        <Row gutter={10}>
          <Col {...colLayout}>
            <CustomDatepicker
              name={"sale_at"}
              required={true}
              placeholder={"Date"}
            />
          </Col>
          <Col {...colLayout}>
            <CustomInput
              type={"text"}
              required={true}
              placeholder={"Reference Number"}
              name={"reference_number"}
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
              <Col xs={16}>
                <CurrencyComponent />
              </Col>
              <Col xs={8}>
                <CurrencyExchangeComponent />
              </Col>
            </Row>
          </Col>
          <SearchProduct products={products} setProducts={setProducts} />
        </Row>
      </div>
    </GlobalUtilityStyle>
  );
};

export const PosRegister = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  setProductUnits,
  form,
  fields,
}) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = Object.values(formValues.product_list.qty).reduce(
      (acc, cur) => acc + parseInt(cur),
      0
    );
    setTotalQuantity(total);

    const totalPrice = Object.values(formValues.product_list.total).reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    setTotalPrice(totalPrice?.toFixed(2));

    // const totalTax = Object.values(formValues.product_list.tax).reduce(
    //   (acc, cur) => acc + parseFloat(cur),
    //   0
    // );
    // setTotalTax(totalTax.toFixed(2));

    // const totalDiscount = Object.values(
    //   formValues.product_list.discount
    // ).reduce((acc, cur) => acc + parseFloat(cur), 0);

    // setTotalDiscount(totalDiscount.toFixed(2));
  }, [formValues, products]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const showModal = (value) => {
    setIsModalOpen(true);
    setModalType(value);
  };
  const hideModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <>
      <Form
        form={form}
        fields={fields}
        layout="vertical"
        autoComplete="on"
        scrollToFirstError
        className="h-[90vh]"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex-none">
            <RegisterForm products={products} setProducts={setProducts} />
          </div>

          <div className="flex-grow overflow-y-auto bg-white">
            <ProductTableComponent
              products={products}
              setProducts={setProducts}
              formValues={formValues}
              setFormValues={setFormValues}
              productUnits={productUnits}
              setProductUnits={setProductUnits}
            />
          </div>

          <div className="flex-none bg-white py-3 px-2 flex flex-col gap-2 rounded-md shadow-md">
            <hr />

            <div className=" grid grid-cols-12 px-2">
              <span className="text-md font-semibold col-span-7">Total</span>

              <span className="col-span-5 flex flex-col lg:flex-row justify-around">
                <span className="text-md font-semibold ">
                  Qty: ({totalQuantity})
                </span>
                <span className="text-md font-semibold ">
                  SubTotal: ({totalPrice})
                </span>
              </span>
            </div>

            <hr />
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-2">
              <div className="grid grid-cols-2">
                <span>Items</span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-2">
                <span>Total</span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("discount")}
                >
                  Discount
                  <FaRegEdit className="primary-text" />
                </span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("coupon")}
                >
                  Coupon
                  <FaRegEdit className="primary-text" />
                </span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline "
                  onClick={() => showModal("tax")}
                >
                  Tax
                  <FaRegEdit className="primary-text" />
                </span>
                <span>0</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("shipping")}
                >
                  Shipping
                  <FaRegEdit className="primary-text" />
                </span>
                <span>0</span>
              </div>
            </div>

            <div className="text-center secondary-bg primary-text text-lg py-1 font-semibold rounded-sm">
              Grand Total
            </div>

            <Button
              type="primary"
              // icon={<MdOutlineCancel />}
              onClick={() => form.resetFields()}
              className=" flex justify-center items-center gap-2"
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>

      <CustomModal></CustomModal>
    </>
  );
};
