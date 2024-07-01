import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { GlobalUtilityStyle } from "../../container/Styled";
import { fullColLayout } from "../../layout/FormLayout";
import { useGetAllCouponQuery } from "../../redux/services/coupon/couponApi";
import { useGetAllCurrencyQuery } from "../../redux/services/currency/currencyApi";
import { useGetAllCustomerQuery } from "../../redux/services/customer/customerApi";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import CustomerCreate from "../Customer/CustomerCreate";
import { CashierComponent } from "../ReusableComponent/CashierComponent";
import { WarehouseComponent } from "../ReusableComponent/WarehouseComponent";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomInput from "../Shared/Input/CustomInput";
import CustomModal from "../Shared/Modal/CustomModal";
import { SearchProduct } from "../Shared/ProductControllerComponent/SearchProduct";
import CustomSelect from "../Shared/Select/CustomSelect";
import { CustomSelectButton } from "../Shared/Select/CustomSelectButton";
import ProductTableComponent from "./PosProductTableComponent";
const { Text } = Typography;
// import { colLayout } from "../../layout/FormLayout";

// const WarehouseComponent = () => {
//   const form = Form.useFormInstance();
//   const { data, isLoading } = useGetWarehousesQuery({
//     params: {
//       selectValue: ["id", "name"],
//     },
//   });

//   const options = data?.results?.warehouse?.map((warehouse) => ({
//     value: warehouse.id?.toString(),
//     label: warehouse.name,
//   }));

// useEffect(() => {
//   if (options?.length) {
//     form.setFieldValue("warehouse_id", options[0].value);
//   }
// }, [form, options]);

//   return (
//     <CustomSelect
//       placeholder={"Warehouse"}
//       showSearch={true}
//       isLoading={isLoading}
//       options={options}
//       required={true}
//       name="warehouse_id"
//       customStyle={true}
//     />
//   );
// };

// const CashierComponent = () => {
//   const form = Form.useFormInstance();
//   const { data, isLoading } = useGetAllCashierQuery({
//     params: {
//       selectValue: ["id", "name"],
//     },
//   });

//   const options = data?.results?.cashier?.map((cashier) => ({
//     value: cashier.id?.toString(),
//     label: cashier.name,
//   }));

// useEffect(() => {
//   if (options?.length) {
//     form.setFieldValue("cashier_id", options[0].value);
//   }
// }, [form, options]);

//   return (
//     <CustomSelect
//       placeholder={"Cashier"}
//       showSearch={true}
//       isLoading={isLoading}
//       options={options}
//       required={true}
//       name="cashier_id"
//       customStyle={true}
//     />
//   );
// };

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
    if (options?.length && !form.getFieldValue("customer_id")) {
      form.setFieldValue("customer_id", options[0].value);
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
        name="customer_id"
        customStyle={true}
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
      customStyle={true}
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
      name={"exchange_rate"}
      placeholder={"Exchange Rate"}
      suffix={content}
      customStyle={true}
    />
  );
};

const TaxComponent = () => {
  const params = useGlobalParams({
    selectValue: ["id", "name", "rate"],
  });

  const { data, isFetching } = useGetAllTaxQuery({
    params,
  });

  const options = data?.results?.tax?.map((item) => {
    return {
      value: item.rate,
      label: item.name,
    };
  });
  return (
    <CustomSelect
      options={options}
      name={"tax_rate"}
      isLoading={isFetching}
      placeholder={"Tax"}
    />
  );
};

const CouponComponent = ({ setType, setProductUnits }) => {
  const { data, isFetching } = useGetAllCouponQuery({});

  console.log(data);

  const options = data?.results?.coupon?.map((item) => {
    return {
      value: item.id?.toString(),
      label: item.code,
      type: item.type,
      rate: item.amount,
    };
  });

  const onSelect = (value, option) => {
    setType(option.type);
    setProductUnits((prevValues) => {
      return {
        ...prevValues,
        coupon_rate: option.rate,
      };
    });
  };
  return (
    <CustomSelect
      options={options}
      name={"coupon_id"}
      isLoading={isFetching}
      placeholder={"Coupon"}
      onSelect={onSelect}
    />
  );
};

const colLayout = {
  xs: 24,
  lg: 12,
  xxl: 8,
};

const RegisterForm = ({ products, setProducts }) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    const currentDate = dayjs(new Date());
    form.setFieldValue("sale_at", currentDate);
  }, [form]);

  return (
    <GlobalUtilityStyle className="pb-5 ">
      <div className="flex flex-col">
        <Row gutter={5}>
          <Col {...colLayout}>
            <CustomDatepicker
              name={"sale_at"}
              required={true}
              placeholder={"Date"}
              customStyle={true}
            />
          </Col>
          <Col {...colLayout}>
            <CustomInput
              type={"text"}
              required={true}
              placeholder={"Reference Number"}
              name={"reference_number"}
              customStyle={true}
            />
          </Col>
          <Col {...colLayout}>
            <WarehouseComponent label={false} />
          </Col>
          <Col {...colLayout}>
            <CashierComponent label={false} />
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

  setGrandTotal,
  type,
  setType,
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

  // const discount = Form.useWatch("Discount", form);
  // const tax = Form.useWatch("Tax", form);
  // const shipping = Form.useWatch("Shipping", form);

  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [coupon, setCoupon] = useState(0);

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

  const taxRate = Form.useWatch("tax_rate", form);

  const handleSubmit = async () => {
    if (modalType === "Discount") {
      setDiscount(form.getFieldValue(modalType));
    }

    if (modalType === "Shipping Cost") {
      setShipping(form.getFieldValue(modalType));
    }

    if (modalType === "Coupon") {
      if (type.toLowerCase() === "fixed") {
        setCoupon(productUnits.coupon_rate);
      }
      if (type.toLowerCase() === "percentage") {
        setCoupon((totalPrice * productUnits.coupon_rate) / 100);
      }
    }

    hideModal();
  };

  const tax = (totalPrice * (taxRate ?? 0)) / 100;

  const grand_total =
    parseFloat(totalPrice) +
    parseFloat(tax ?? 0) +
    parseFloat(shipping) -
    parseFloat(discount) -
    parseFloat(coupon);

  useEffect(() => {
    setGrandTotal(grand_total);
  }, [grand_total, setGrandTotal]);

  const tableStyleProps = {
    summary: () => {
      return (
        <Table.Summary fixed="bottom">
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={3}>
              <Text className="font-bold" type="">
                Total
              </Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2} align="center">
              <Text type="" className="font-bold">
                {totalQuantity}
              </Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} align="center">
              <Text type="" className="font-bold">
                {totalPrice}
              </Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    },
    sticky: {
      // offsetHeader: 440,
      offsetScroll: 400,
    },
  };

  const item = Object.values(formValues.product_list.qty).length;

  return (
    <>
      <Form
        form={form}
        fields={fields}
        layout="vertical"
        autoComplete="on"
        scrollToFirstError
        className="h-[90vh]"
        noStyle
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex-none">
            <RegisterForm products={products} setProducts={setProducts} />
          </div>

          <div className="flex-grow overflow-y-auto bg-white">
            {/* <div className=" bg-white"> */}
            <ProductTableComponent
              products={products}
              setProducts={setProducts}
              formValues={formValues}
              setFormValues={setFormValues}
              productUnits={productUnits}
              setProductUnits={setProductUnits}
              tableStyleProps={item && tableStyleProps}
            />
          </div>

          <div className="flex-none bg-white pb-3 px-2 flex flex-col gap-2 rounded-md shadow-md">
            {/* <hr />

            <div className=" grid grid-cols-12 px-2">
              <span className="text-md font-semibold col-span-6">Total</span>

              <span className="col-span-5 flex flex-col lg:flex-row justify-around">
                <span className="text-md font-semibold ">
                  Qty: ({totalQuantity})
                </span>
                <span className="text-md font-semibold ">
                  SubTotal: ({totalPrice})
                </span>
              </span>
            </div> */}

            {/* <hr /> */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-2 px-2">
              <div className="grid grid-cols-2">
                <span>Items</span>
                <span className="font-semibold">
                  {Object.keys(formValues.product_list.qty).length}
                </span>
              </div>
              <div className="grid grid-cols-2">
                <span>Total</span>
                <span className="font-semibold">{totalPrice}</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("Discount")}
                >
                  Discount
                  <FaRegEdit className="primary-text" />
                </span>
                <Form.Item name="Discount" noStyle></Form.Item>
                <span className="font-semibold">{discount ?? 0}</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("Coupon")}
                >
                  Coupon
                  <FaRegEdit className="primary-text" />
                </span>
                <Form.Item name="Coupon" noStyle></Form.Item>
                <span className="font-semibold">{coupon ?? 0}</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline "
                  onClick={() => showModal("Tax")}
                >
                  Tax
                  <FaRegEdit className="primary-text" />
                </span>
                <Form.Item name="Tax" noStyle></Form.Item>
                <span className="font-semibold">{tax ?? 0}</span>
              </div>
              <div className="grid grid-cols-2">
                <span
                  className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline"
                  onClick={() => showModal("Shipping Cost")}
                >
                  Shipping
                  <FaRegEdit className="primary-text" />
                </span>
                <Form.Item name="Shipping" noStyle></Form.Item>
                <span className="font-semibold">{shipping ?? 0}</span>
              </div>
            </div>

            <div className="text-center secondary-bg primary-text text-lg py-1 font-semibold rounded-sm">
              Grand Total {grand_total.toFixed(2) ?? 0}
            </div>

            <Button
              type="primary"
              onClick={() => {
                form.resetFields();
                setFormValues({
                  product_list: {
                    product_id: {},
                    qty: {},
                    sale_unit_id: {},
                    net_unit_price: {},
                    discount: {},
                    tax_rate: {},
                    tax: {},
                    total: {},

                    tax_id: {},
                  },
                });

                setProducts([]);

                setProductUnits({
                  sale_units: {},
                  tax_rate: {},
                });
              }}
              className=" flex justify-center items-center gap-2"
            >
              Reset
            </Button>
          </div>
        </div>
      </Form>

      <CustomModal
        openModal={isModalOpen}
        hideModal={hideModal}
        title={modalType}
        width={600}
        showCloseButton={false}
        footer={true}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          fields={fields}
          layout="vertical"
          autoComplete="on"
          scrollToFirstError
        >
          <Row>
            <Col {...fullColLayout}>
              {modalType === "Tax" ? (
                <TaxComponent />
              ) : modalType === "Coupon" ? (
                <CouponComponent
                  setType={setType}
                  setProductUnits={setProductUnits}
                />
              ) : (
                <CustomInput
                  type="number"
                  name={modalType}
                  placeholder={modalType}
                />
              )}
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </>
  );
};
