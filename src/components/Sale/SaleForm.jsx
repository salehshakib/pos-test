import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import {
  colLayout,
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import {
  calculateGrandTotal,
  calculateTotalPrice,
} from "../../utilities/lib/generator/generatorUtils";
import { CashierComponent } from "../Generator/overview/CashierComponent";
import { WarehouseComponent } from "../Generator/overview/WarehouseComponent";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { CurrencyFormComponent } from "./overview/CurrencyComponent";
import { CustomerComponent } from "./overview/CustomerComponent";
import { PaymentTypeComponent } from "./overview/PaymentFormComponent";
import { SaleProductTable } from "./overview/SaleProductTable";
import { useGlobalParams } from "../../utilities/hooks/useParams";

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("sale_status", "Completed");
  }, [form]);

  const options = [
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "Pending",
      label: "Pending",
    },
  ];

  return (
    <CustomSelect label="Sale Status" options={options} name={"sale_status"} />
  );
};

const PaymentComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("payment_status", "Pending");
  }, [form]);

  const options = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Due",
      label: "Due",
    },
    {
      value: "Partial",
      label: "Partial",
    },
    {
      value: "Paid",
      label: "Paid",
    },
  ];

  return (
    <CustomSelect
      label="Payment Status"
      options={options}
      name={"payment_status"}
    />
  );
};

const TaxComponent = () => {
  // const { data, isFetching } = useGetAllTaxQuery({});

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
      tax_rate: item?.rate,
    };
  });

  return (
    <CustomSelect
      label="Order Tax"
      options={options}
      name={"tax_rate"}
      isLoading={isFetching}
    />
  );
};

const DiscountTypeComponent = () => {
  const form = Form.useFormInstance();
  const discount = Form.useWatch("discount", form);

  const required = discount ? true : false;

  const options = [
    {
      value: "Fixed",
      label: "Fixed",
    },
    {
      value: "Percentage",
      label: "Percentage",
    },
  ];

  return (
    <CustomSelect
      options={options}
      label="Discount Type"
      name={"discount_type"}
      required={required}
    />
  );
};

export const SaleForm = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  setProductUnits,
  ...props
}) => {
  const discount = Form.useWatch("discount", props.form);
  const shipping_cost = Form.useWatch("shipping_cost", props.form);
  const tax_rate = Form.useWatch("tax_rate", props.form);

  const totalItems = Object.keys(formValues.product_list?.qty)?.length ?? 0;
  const totalQty = Object.values(formValues.product_list?.qty).reduce(
    (acc, cur) => acc + (parseFloat(cur) || 0),
    0
  );

  const totalPrice = calculateTotalPrice(formValues.product_list);

  const grandTotal = calculateGrandTotal(
    totalPrice,
    tax_rate ?? 0,
    discount,
    shipping_cost
  );

  return (
    <>
      <CustomForm {...props}>
        <Row {...rowLayout}>
          <Col {...colLayout}>
            <CustomerComponent />
          </Col>
          <Col {...colLayout}>
            <WarehouseComponent />
          </Col>
          <Col {...colLayout}>
            <CashierComponent />
          </Col>

          <Col {...mdColLayout}>
            <CurrencyFormComponent />
          </Col>

          <Col {...mdColLayout}>
            <CustomDatepicker label="Date" required={true} name={"sale_at"} />
          </Col>

          <SaleProductTable
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
            productUnits={productUnits}
            setProductUnits={setProductUnits}
          />
          <Col {...largeLayout}>
            <TaxComponent />
          </Col>

          <Col {...largeLayout}>
            <DiscountTypeComponent />
          </Col>
          <Col {...largeLayout}>
            <CustomInput label="Discount" type={"number"} name={"discount"} />
          </Col>
          <Col {...largeLayout}>
            <CustomInput
              label="Shipping Cost"
              type={"number"}
              name={"shipping_cost"}
            />
          </Col>
          <Col {...colLayout}>
            <StatusComponent />
          </Col>

          <Col {...colLayout}>
            <PaymentComponent />
          </Col>

          <PaymentTypeComponent />

          <Col {...fullColLayout}>
            <CustomUploader label={"Attach Document"} name={"attachment"} />
          </Col>

          <Col {...mdColLayout}>
            <CustomInput type={"textarea"} name="sale_note" label="Sale Note" />
          </Col>
          <Col {...mdColLayout}>
            <CustomInput
              type={"textarea"}
              name="staff_note"
              label="Staff Note"
            />
          </Col>
        </Row>
      </CustomForm>

      <Row className="pb-20">
        <Col {...fullColLayout}>
          <Row className="rounded-md overflow-hidden">
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Items</span>
              <span>
                {totalItems} ({totalQty})
              </span>
            </Col>
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Total</span>
              <span>{Number(totalPrice).toFixed(2)}</span>
            </Col>
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Tax</span>
              <span>{Number(tax_rate ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Discount</span>
              <span>{Number(discount ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Shipping Cost</span>
              <span>{Number(shipping_cost ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={4}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Grand Total</span>
              <span>{Number(grandTotal).toFixed(2)}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
