import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import { discountTypeOptions } from "../../assets/data/discountTypes";
import { paymentStatusOptions } from "../../assets/data/paymentStatus";
import { saleStatusOptions } from "../../assets/data/saleStatus";
import {
  colLayout,
  fullColLayout,
  largeLayout,
  mdColLayout,
  rowLayout,
} from "../../layout/FormLayout";
import { useGetAllTaxQuery } from "../../redux/services/tax/taxApi";
import {
  DEFAULT_SELECT_VALUES,
  useGlobalParams,
} from "../../utilities/hooks/useParams";
import {
  calculateGrandTotal,
  calculateTotalPrice,
} from "../../utilities/lib/generator/generatorUtils";
import { CashierComponent } from "../ReusableComponent/CashierComponent";
import { TotalRow } from "../ReusableComponent/TotalRow";
import { WarehouseComponent } from "../ReusableComponent/WarehouseComponent";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { CurrencyFormComponent } from "./overview/CurrencyComponent";
import { CustomerComponent } from "./overview/CustomerComponent";
import { PaymentTypeComponent } from "./overview/PaymentFormComponent";
import { SaleProductTable } from "./overview/SaleProductTable";

const useSetFieldValue = (field, value) => {
  const form = Form.useFormInstance();
  useEffect(() => {
    form.setFieldValue(field, value);
  }, [form, field, value]);
};

const StatusComponent = () => {
  useSetFieldValue("sale_status", saleStatusOptions[0].value);

  return (
    <CustomSelect
      label="Sale Status"
      options={saleStatusOptions}
      name={"sale_status"}
    />
  );
};

const PaymentStatusComponent = () => {
  useSetFieldValue("payment_status", paymentStatusOptions[0].value);
  return (
    <CustomSelect
      label="Payment Status"
      options={paymentStatusOptions}
      name="payment_status"
    />
  );
};

const TaxComponent = () => {
  const params = useGlobalParams({
    selectValue: [...DEFAULT_SELECT_VALUES, "rate"],
  });

  const { data, isFetching } = useGetAllTaxQuery({ params });

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
  const required = !!discount;

  return (
    <CustomSelect
      options={discountTypeOptions}
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
  const form = props.form;

  const discount = Form.useWatch("discount", form);
  const shipping_cost = Form.useWatch("shipping_cost", form);
  const tax_rate = Form.useWatch("tax_rate", form);

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

  console.log(totalItems, totalQty, totalPrice, grandTotal);

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
            <PaymentStatusComponent />
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

      <TotalRow
        totalItems={totalItems}
        totalQty={totalQty}
        totalPrice={totalPrice}
        taxRate={tax_rate}
        discount={discount}
        shippingCost={shipping_cost}
        grandTotal={grandTotal}
      />
    </>
  );
};
