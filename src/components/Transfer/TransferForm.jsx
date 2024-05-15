import { Col, Row } from "antd";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import { colLayout, fullColLayout, rowLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomUploader from "../Shared/Upload/CustomUploader";
import TransferListTable from "./TransferListTable";

const TransferForm = (props) => {
  return (
    <CustomForm {...props}>
      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomSelect
            label="Product"
            placeholder={"Product"}
            showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>
      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomSelect
            label="Warehouse (From)"
            placeholder={"Warehouse (From)"}
            showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            label="Warehouse (To)"
            placeholder={"Warehouse (To)"}
            showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomDatepicker
            label="Date"
            type={"date"}

            // picker
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomSelect
            label="File Status"
            placeholder={"File Status"}

            // showSearch={true}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Col {...colLayout}>
          <CustomInput
            label="Shipping Cost"
            type={"number"}
            required={true}
            name={"total_cost"}
          />
        </Col>
        <Col {...colLayout}>
          <CustomUploader label={"Attach Document"} />
        </Col>
      </Row>

      <Row {...rowLayout}>
        <Col {...fullColLayout}>
          <CustomInput
            label="Sale Note"
            type={"textarea"}
            // required={true}
            // name={"adjustment_name"}
          />
        </Col>
      </Row>

      <TransferListTable />
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
      </Row>
    </CustomForm>
  );
};

export default TransferForm;
