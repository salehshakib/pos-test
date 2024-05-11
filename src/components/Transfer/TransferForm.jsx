import { Col, Row } from "antd";
import { MdDelete } from "react-icons/md";
import CustomDatepicker from "../Shared/DatePicker/CustomDatepicker";
import CustomForm from "../Shared/Form/CustomForm";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomTable from "../Shared/Table/CustomTable";
import CustomUploader from "../Shared/Upload/CustomUploader";

const rowLayout = {
  gutter: 25,
};

const colLayout = {
  xs: 24,
  md: 12,
  lg: 8,
};

const fullColLayout = {
  xs: 24,
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    align: "center",
    render: (code) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {code}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    render: (quantity) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {quantity}
      </span>
    ),
  },
  {
    title: "Batch No",
    dataIndex: "batch_no",
    key: "batch_no",
    align: "center",
    render: (batch_no) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {batch_no}
      </span>
    ),
  },
  {
    title: "Expired Date",
    dataIndex: "expireddate",
    key: "expireddate",
    align: "center",
    render: (expireddate) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {expireddate}
      </span>
    ),
  },
  {
    title: "Net Unit Code",
    dataIndex: "net_unit_code",
    key: "net_unit_code",
    align: "center",
    render: (net_unit_code) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {net_unit_code}
      </span>
    ),
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    align: "center",
    render: (discount) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {discount}
      </span>
    ),
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    align: "center",
    render: (tax) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {tax}
      </span>
    ),
  },
  {
    title: "Sub Total",
    dataIndex: "sub_total",
    key: "sub_total",
    align: "center",
    render: (sub_total) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sub_total}
      </span>
    ),
  },
  {
    title: <MdDelete className="text-lg md:text-xl" />,
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 40,
    fixed: "right",
    //   render: ({ handleDeleteModal }, record) => {
    //     return (
    //       <div className="flex justify-center items-center gap-3">
    //         <button
    //           onClick={() => handleDeleteModal(record.id)}
    //           className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
    //         >
    //           <MdDelete className="text-lg md:text-xl" />
    //         </button>
    //       </div>
    //     );
    //   },
  },
];

const TransferForm = ({ handleSubmit, isLoading, fields }) => {
  const dataSource = [];

  const subTotalRow = {
    key: "subtotal",
    name: "Subtotal",
    // totalOnz: { subtotal },
    // PNLAED: { pnlAEDTotal },
  };

  dataSource.push(subTotalRow);
  return (
    <CustomForm
      handleSubmit={handleSubmit}
      fields={fields}
      isLoading={isLoading}
    >
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

      <Row {...rowLayout} className="my-5">
        <CustomTable columns={columns} dataSource={dataSource} />
      </Row>
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
