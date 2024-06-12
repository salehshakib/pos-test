import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import {
  calculateGrandTotal,
  calculateTotalPrice,
} from "../../utilities/lib/generator/generatorUtils";
import { SupplierComponent } from "../Generator/overview/SupplierComponent";
import { WarehouseComponent } from "../Generator/overview/WarehouseComponent";
import { CurrencyFormComponent } from "../Sale/overview/CurrencyComponent";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { PurchaseProductTable } from "./overview/PurchaseProductTable";

// const StatusComponent = () => {
//   const form = Form.useFormInstance();

//   useEffect(() => {
//     form.setFieldValue("status", "Completed");
//   }, [form]);

//   const options = [
//     {
//       value: "Completed",
//       label: "Completed",
//     },
//     {
//       value: "Pending",
//       label: "Pending",
//     },
//   ];

//   return <CustomSelect label="Sale Status" options={options} name={"status"} />;
// };

const PurchaseStatus = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("purchase_status", "Received");
  }, [form]);

  const options = [
    {
      value: "Received",
      label: "Received",
    },
    {
      value: "Partial",
      label: "Partial",
    },
    {
      value: "Pending",
      label: "Pending",
    },

    {
      value: "Ordered",
      label: "Ordered",
    },
  ];

  return (
    <CustomSelect
      label="Purchase Status"
      options={options}
      name={"purchase_status"}
    />
  );
};

const TaxComponent = () => {
  const { data, isFetching } = useGetAllTaxQuery({});

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

const PaymentComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("payment_status", "Due");
  }, [form]);

  const options = [
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

const PaymentType = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("payment_type", "Cash");
  }, [form]);

  const options = [
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Card",
      label: "Card",
    },
    {
      value: "Cheque",
      label: "Cheque",
    },
  ];

  return (
    <CustomSelect
      label="Payment Type"
      options={options}
      name={"payment_type"}
      required={true}
    />
  );
};

const PaymentTypeComponent = ({ formValues }) => {
  const form = Form.useFormInstance();
  const paymentStatus = Form.useWatch("payment_status", form);

  const paid_amount = Form.useWatch("paid_amount", form);

  useEffect(() => {
    const totalPrice = calculateTotalPrice(formValues.product_list);

    if (paymentStatus === "Paid") {
      form.setFieldValue("paid_amount", totalPrice);
    }

    if (paymentStatus === "Partial") {
      if (Number(paid_amount) > totalPrice) {
        form.setFieldValue("paid_amount", totalPrice);
      }
    }
  }, [paymentStatus, form, formValues, paid_amount]);

  return (
    (paymentStatus === "Paid" || paymentStatus === "Partial") && (
      <>
        <Col {...colLayout}>
          <PaymentType />
        </Col>

        <Col {...colLayout}>
          <CustomInput
            type={"number"}
            name="paid_amount"
            label="Paid Amount"
            required={true}
          />
        </Col>
      </>
    )
  );
};

export const PurchaseForm = ({
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
            <WarehouseComponent />
          </Col>
          <Col {...colLayout}>
            <SupplierComponent />
          </Col>

          <Col {...colLayout}>
            <PurchaseStatus />
          </Col>

          <Col {...mdColLayout}>
            <CurrencyFormComponent />
          </Col>

          <Col {...mdColLayout}>
            <CustomDatepicker
              label="Date"
              required={true}
              name={"purchase_at"}
            />
          </Col>

          <PurchaseProductTable
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
            productUnits={productUnits}
            setProductUnits={setProductUnits}
          />

          <Col {...colLayout}>
            <TaxComponent />
          </Col>

          <Col {...colLayout}>
            <CustomInput label="Discount" type={"number"} name={"discount"} />
          </Col>

          <Col {...colLayout}>
            <CustomInput
              label="Shipping Cost"
              type={"number"}
              name={"shipping_cost"}
            />
          </Col>

          <Col {...colLayout}>
            <PaymentComponent />
          </Col>

          <PaymentTypeComponent formValues={formValues} />

          <Col {...fullColLayout}>
            <CustomUploader label={"Attach Document"} name={"attachment"} />
          </Col>

          <Col {...fullColLayout}>
            <CustomInput
              type={"textarea"}
              name="purchase_note"
              label="Purchase Note"
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
