import { Col, Form } from "antd";
import { MdDelete } from "react-icons/md";
import { colLayout, fullColLayout } from "../Shared/Form/FormLayout";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomTable from "../Shared/Table/CustomTable";

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

const SpecificProductsComponent = () => {
  return (
    <CustomSelect
      label="Products"
      mode="multiple"
      options={[
        {
          label: "Product 1",
          value: "product_1",
        },
        {
          label: "Product 2",
          value: "product_2",
        },
      ]}
      name={"products"}
      required={true}
    />
  );
};

const ApplicableFrom = () => {
  const form = Form.useFormInstance();
  const formData = Form.useWatch("applicable_for", form);

  const dataSource = [];

  return (
    <>
      <Col {...colLayout}>
        <CustomSelect
          label="Applicable For"
          options={[
            {
              label: "All Products",
              value: "all",
            },
            {
              label: "Specific Products",
              value: "specific",
            },
          ]}
          name={"applicable_for"}
          required={true}
        />
      </Col>

      <Col {...fullColLayout}>
        {formData === "specific" && <SpecificProductsComponent />}
      </Col>
      <Col {...fullColLayout} className="my-5">
        {formData === "specific" && (
          <CustomTable columns={columns} dataSource={dataSource} />
        )}
      </Col>
    </>
  );
};

export default ApplicableFrom;
