import { Button, Form, Layout, Tag } from "antd";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
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

const { Footer } = Layout;

const PosLayout = () => {
  const navigate = useNavigate();
  const [posForm] = Form.useForm();

  const { pettyCash } = useSelector((state) => state.pettyCash);
  const [collapsed, setCollapsed] = useState(false);

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

  const handleSubmit = async () => {
    posForm
      .validateFields()
      .then(() => {
        const values = posForm.getFieldsValue();
        console.log(values);
        console.log(formValues);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
    // .finally(() => {
    //   form.resetFields();
    // });
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
            <Payment handleSubmit={handleSubmit} form={posForm} />
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
