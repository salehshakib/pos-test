import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import CustomSelect from "../../Shared/Select/CustomSelect";
import CustomForm from "../../Shared/Form/CustomForm";
import {
  colLayout,
  fullColLayout,
  mdColLayout,
  rowLayout,
} from "../../../layout/FormLayout";
import { CashierComponent } from "../overview/CashierComponent";
import { SupplierComponent } from "../overview/SupplierComponent";
import { CustomerComponent } from "../overview/CustomerComponent";
import { WarehouseComponent } from "../overview/WarehouseComponent";
import { QuotationProductTable } from "../Quotation/overview/QuotationProductTable";
import { TaxComponent } from "../overview/TaxComponent";
import CustomInput from "../../Shared/Input/CustomInput";
import CustomUploader from "../../Shared/Upload/CustomUploader";

const StatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("status", "Pending");
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

  return <CustomSelect label="Status" options={options} name={"status"} />;
};

export const InvoiceForm = (props) => {
  return (
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
        <QuotationProductTable />

        <Col {...colLayout}>
          <TaxComponent />
        </Col>
        <Col {...colLayout}>
          <CustomInput
            label="Order Discount"
            type={"number"}
            name={"dicount"}
          />
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
  );
};
