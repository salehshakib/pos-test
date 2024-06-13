import { App, Button, Form, Layout, Tag } from "antd";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../components/AllSection/Header/Logo";
import Profile from "../components/AllSection/Header/Profile";
import Payment from "../components/PosRegister/Payment";
import PosFilterComponent from "../components/PosRegister/PosFilterComponent";
import { PosRegister } from "../components/PosRegister/PosRegister";
import { GlobalUtilityStyle } from "../container/Styled";
import PosProducts from "../pages/Dashboard/PosRegister/PosProducts";
import { mode } from "../utilities/configs/base_url";
import SideBar from "./SideBar";
import { decimalConverter } from "../utilities/lib/return/decimalComverter";
import dayjs from "dayjs";
import {
  calculateGrandTotal,
  calculateTotalPrice,
  calculateTotalTax,
} from "../utilities/lib/generator/generatorUtils";
import { appendToFormData } from "../utilities/lib/appendFormData";
import { useCreateSaleMutation } from "../redux/services/sale/saleApi";
import { closeCreateDrawer } from "../redux/services/drawer/drawerSlice";

const { Footer } = Layout;

const PosLayout = () => {
  const navigate = useNavigate();
  const [posForm] = Form.useForm();
  const [errorFields, setErrorFields] = useState([]);

  const { message } = App.useApp();
  const dispatch = useDispatch();

  const { pettyCash } = useSelector((state) => state.pettyCash);
  const [collapsed, setCollapsed] = useState(false);

  const [createSale, { isLoading }] = useCreateSaleMutation();

  const [formValues, setFormValues] = useState({
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

  const [products, setProducts] = useState([]);

  const [productUnits, setProductUnits] = useState({
    sale_units: {},
    tax_rate: {},
  });

  useEffect(() => {
    if (pettyCash === "Close") {
      navigate("/dashboard");
    }
  }, [navigate, pettyCash]);

  const handleSubmit = () => {
    posForm
      .validateFields()
      .then(async () => {
        const values = posForm.getFieldsValue();

        const { discount, shipping_cost, tax_rate, sale_at, paid_amount } =
          values ?? {};

        const { product_list } = formValues;

        const productListArray = product_list?.qty
          ? Object.keys(product_list.qty)
              .filter(
                (product_id) => product_list.qty[product_id] !== undefined
              )
              .map((product_id) => ({
                product_id: parseInt(product_id),
                qty: product_list.qty[product_id],
                sale_unit_id: product_list.sale_unit_id[product_id],
                net_unit_price: decimalConverter(
                  product_list.net_unit_price[product_id]
                ),
                discount: decimalConverter(product_list.discount[product_id]),
                tax_rate: decimalConverter(product_list.tax_rate[product_id]),
                tax: decimalConverter(product_list.tax[product_id]),
                total: decimalConverter(product_list.total[product_id]),
              }))
          : [];

        if (productListArray.length === 0) {
          message.info("Please add atleast one product");
          return;
        }

        const totalPrice = calculateTotalPrice(product_list);
        const orderTax = calculateTotalTax(totalPrice, values.tax_rate);

        const totalQty =
          Object.values(formValues.product_list?.qty).reduce(
            (acc, cur) => acc + parseInt(cur),
            0
          ) ?? 0;

        const totalDiscount =
          Object.values(formValues.product_list?.discount).reduce(
            (acc, cur) => acc + parseFloat(cur),
            0
          ) ?? 0;

        const totalTax =
          Object.values(formValues.product_list?.tax).reduce(
            (acc, cur) => acc + parseFloat(cur),
            0
          ) ?? 0;

        const postObj = {
          ...values,
          sale_at: dayjs(sale_at).format("YYYY-MM-DD"),
          discount: decimalConverter(discount),
          shipping_cost: decimalConverter(shipping_cost),
          tax_rate: decimalConverter(tax_rate),
          item: productListArray.length,
          total_qty: totalQty,
          total_discount: decimalConverter(totalDiscount),
          total_tax: decimalConverter(totalTax),
          total_price: decimalConverter(totalPrice),
          tax: decimalConverter(orderTax),
          change: decimalConverter(
            Number(values?.recieved_amount ?? 0) -
              Number(values?.paid_amount ?? 0)
          ),
          grand_total: calculateGrandTotal(
            totalPrice,
            orderTax,
            discount,
            shipping_cost
          ),

          product_list: JSON.stringify(productListArray),
          petty_cash_id: 8,
        };

        if (paid_amount) {
          postObj.paid_amount = Number(paid_amount).toFixed(2);
        }

        const formData = new FormData();

        appendToFormData(postObj, formData);

        const { data, error } = await createSale({
          data: formData,
        });
        if (data?.success) {
          dispatch(closeCreateDrawer());

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
        }
        if (error) {
          const errorFields = Object.keys(error?.data?.errors).map(
            (fieldName) => ({
              name: fieldName,

              errors: error?.data?.errors[fieldName],
            })
          );
          setErrorFields(errorFields);
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      })
      .finally(() => {
        posForm.resetFields();
      });
  };

  if (pettyCash === "Open") {
    return (
      <GlobalUtilityStyle>
        <div className="flex flex-col relative h-screen">
          <div className="grow min-h-[60vh]  overflow-auto h-full bg-[#F5F5F5]">
            <div className="grid grid-cols-2 h-[85vh] ">
              <div>
                <PosRegister
                  formValues={formValues}
                  setFormValues={setFormValues}
                  products={products}
                  setProducts={setProducts}
                  productUnits={productUnits}
                  setProductUnits={setProductUnits}
                  form={posForm}
                  fields={errorFields}
                />
              </div>

              <div className="relative flex flex-col h-[90vh] ">
                <div className="bg-white flex justify-between items-center px-5 w-full top-0 z-50 shadow-md">
                  <div className="flex items-center gap-6 text-2xl">
                    <Button
                      className="p-0 border border-none rounded-full flex items-center justify-center text-[20px]"
                      type="text"
                      icon={<GiHamburgerMenu />}
                      onClick={() => setCollapsed(!collapsed)}
                    ></Button>
                    <Logo />
                  </div>
                  {mode === "local" && (
                    <Tag color="processing" className="font-semibold">
                      {mode.toUpperCase()} MODE
                    </Tag>
                  )}
                  <Profile />
                </div>

                <div className="flex grow ">
                  <div className="flex flex-col w-full ">
                    <div>
                      <PosFilterComponent />
                    </div>
                    <div
                      style={{
                        borderRadius: "8px",
                      }}
                      className="shadow-md grow m-4 bg-gray-200 "
                    >
                      <PosProducts
                        products={products}
                        setProducts={setProducts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer
            style={{
              textAlign: "center",
            }}
            className="py-4"
          >
            <Payment
              handleSubmit={handleSubmit}
              form={posForm}
              fields={errorFields}
              isLoading={isLoading}
            />
          </Footer>

          <div className="absolute h-[100vh] overflow-auto z-40 left-0 ">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
        </div>
      </GlobalUtilityStyle>
    );
  }
};

export default PosLayout;
