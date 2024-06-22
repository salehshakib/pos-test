import { Col, Form, Row } from "antd";
import { useEffect } from "react";
import {
  colLayout,
  fullColLayout,
  largeLayout,
  rowLayout,
} from "../../layout/FormLayout";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import { TransferProductTable } from "./overview/TransferProductTable";
import { WarehouseTransferComponent } from "./WarehouseTransferComponent";
import { getCurrentDate } from "../../utilities/lib/currentDate";

const FileStatusComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("status", "Completed");
  }, [form]);

  const options = [
    {
      value: "Completed",
      label: "Completed",
    },
    { value: "Pending", label: "Pending" },
    {
      value: "Sent",
      label: "Sent",
    },
  ];

  return (
    <CustomSelect
      label="File Status"
      placeholder={"File Status"}
      options={options}
      name={"status"}
    />
  );
};

const TransferDateComponent = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    form.setFieldValue("date", getCurrentDate);
  }, [form]);

  return (
    <CustomDatepicker
      label="Date"
      type={"date"}
      required={true}
      name={"date"}
    />
  );
};

const TransferForm = ({
  formValues,
  setFormValues,
  products,
  setProducts,
  productUnits,
  setProductUnits,
  ...props
}) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <WarehouseTransferComponent />

        <Col {...largeLayout}>
          <TransferDateComponent />
        </Col>
        <Col {...largeLayout}>
          <FileStatusComponent />
        </Col>

        <TransferProductTable
          formValues={formValues}
          setFormValues={setFormValues}
          products={products}
          setProducts={setProducts}
          productUnits={productUnits}
          setProductUnits={setProductUnits}
        />

        <Col {...colLayout}>
          <CustomInput
            label="Shipping Cost"
            type={"number"}
            required={true}
            name={"total_cost"}
          />
        </Col>

        <Col {...fullColLayout}>
          <CustomUploader label={"Attach Document"} />
        </Col>

        <Col {...fullColLayout}>
          <CustomInput label="Sale Note" type={"textarea"} name={"note"} />
        </Col>
      </Row>

      {/* <TransferListTable />
      <Row {...rowLayout} className="my-5">
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Items
        </Col>
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Total
        </Col>
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Order Tax
        </Col>
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Order Discount
        </Col>
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Shipping Cost
        </Col>
        <Col lg={4} md={8} sm={12} className="border border-black py-5">
          Grand Total
        </Col>
      </Row> */}
    </CustomForm>
  );
};

export default TransferForm;
