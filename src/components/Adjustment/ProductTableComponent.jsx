import { Col, Form, Select } from "antd";
import { MdDelete } from "react-icons/md";
import { fullColLayout } from "../Shared/Form/FormLayout";
import CustomTable from "../Shared/Table/CustomTable";
import { useState } from "react";
import CustomInput from "../Shared/Input/CustomInput";
const { Option } = Select;

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
    title: "Unit Cost",
    dataIndex: "cost",
    key: "cost",
    align: "center",
    render: (cost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {cost}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    render: (props, record) => {
      const { id, setId, value } = props ?? {};

      return (
        <>
          {record?.id === id ? (
            <span
              style={{
                width: 50,
              }}
            >
              <CustomInput
                type={"number"}
                name={["product_list", "qty"]}
                placeholder="quantity"
              />
            </span>
          ) : (
            <span
              className="text-xs font-medium md:text-sm text-dark dark:text-white87"
              onClick={() => setId(record.id)}
            >
              {value}
            </span>
          )}
        </>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "type",
    key: "type",
    align: "center",
    width: 40,
    // render: () => {
    //   return (
    //     // <div className="flex justify-center items-center gap-3">

    //     // </div>
    //     <Form.Item name={["product_list", "qty"]}>
    //       <Select
    //         style={{
    //           width: 70,
    //         }}
    //       >
    //         <Option value="add">Addition (+)</Option>
    //         <Option value="sub">Subtraction (-)</Option>
    //       </Select>
    //     </Form.Item>
    //   );
    // },
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

export const ProductTableComponent = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch("product_name", form);
  const warehouseData = Form.useWatch("warehouse_id", form);

  const [id, setId] = useState(undefined);

  const dataSource = [
    {
      id: 1,
      quantity: { id, setId, value: 1 },
      //   type: { setId },
    },
    {
      id: 2,
      quantity: { id, setId, value: 1 },
      //   type: { setId },
    },
    {
      id: 3,
      quantity: { id, setId, value: 1 },
      //   type: { setId },
    },
  ];

  dataSource.push({
    name: "Total",
    action: <MdDelete className="text-lg md:text-xl " />,
  });

  return (
    <Col {...fullColLayout}>
      {productData && warehouseData && (
        <CustomTable columns={columns} dataSource={dataSource} />
      )}
    </Col>
  );
};
