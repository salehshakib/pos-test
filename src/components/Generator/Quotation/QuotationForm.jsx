import { Col, Form, Row } from "antd";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../../layout/FormLayout";
import CustomForm from "../../Shared/Form/CustomForm";
import CustomInput from "../../Shared/Input/CustomInput";
import { CashierComponent } from "../overview/CashierComponent";
import { CustomerComponent } from "../overview/CustomerComponent";
import { SupplierComponent } from "../overview/SupplierComponent";
import { WarehouseComponent } from "../overview/WarehouseComponent";
import { QuotationProductTable } from "./overview/QuotationProductTable";
import { useEffect } from "react";
import CustomSelect from "../../Shared/Select/CustomSelect";
import CustomUploader from "../../Shared/Upload/CustomUploader";
import { useGetAllTaxQuery } from "../../../redux/services/tax/taxApi";
import {
  calculateGrandTotal,
  calculateTotalPrice,
} from "../../../utilities/lib/generator/generatorUtils";

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("quotation_status", "Pending");
  }, [form]);

  const options = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Sent",
      label: "Sent",
    },
  ];

  return (
    <CustomSelect label="Status" options={options} name={"quotation_status"} />
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

export const QuotationForm = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  ...props
}) => {
  const discount = Form.useWatch("discount", props.form);
  const shipping_cost = Form.useWatch("shipping_cost", props.form);
  const tax_rate = Form.useWatch("tax_rate", props.form);

  const totalItems = Object.keys(formValues.product_list?.qty)?.length ?? 0;
  const totalQty = Object.values(formValues.product_list?.qty).reduce(
    (acc, cur) => acc + cur,
    0
  );
  const totalPrice = calculateTotalPrice(formValues.product_list);
  const grandTotal = calculateGrandTotal(
    totalPrice,
    tax_rate ?? 0,
    discount,
    shipping_cost
  );

  console.log(formValues);

  return (
    <>
      <CustomForm {...props}>
        <Row {...rowLayout}>
          <Col {...mdColLayout}>
            <CashierComponent />
          </Col>
          <Col {...mdColLayout}>
            <SupplierComponent />
          </Col>
          <Col {...mdColLayout}>
            <CustomerComponent />
          </Col>
          <Col {...mdColLayout}>
            <WarehouseComponent />
          </Col>

          <QuotationProductTable
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
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
            <StatusComponent />
          </Col>

          <Col {...fullColLayout}>
            <CustomUploader label="Attachment" name={"attachment"} />
          </Col>
          <Col {...fullColLayout}>
            <CustomInput label="Note" type={"textarea"} name={"note"} />
          </Col>
        </Row>
      </CustomForm>

      <Row className="pb-20">
        <Col {...fullColLayout}>
          <Row className="rounded-md overflow-hidden">
            <Col
              span={8}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Items</span>
              <span>
                {totalItems} ({totalQty})
              </span>
            </Col>
            <Col
              span={8}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Total</span>
              <span>{Number(totalPrice).toFixed(2)}</span>
            </Col>
            <Col
              span={8}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Tax</span>
              <span>{Number(tax_rate ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={8}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Discount</span>
              <span>{Number(discount ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={8}
              className="border flex justify-between items-center px-2 py-5 text-lg"
            >
              <span className="font-semibold ">Shipping Cost</span>
              <span>{Number(shipping_cost ?? 0).toFixed(2)}</span>
            </Col>
            <Col
              span={8}
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
