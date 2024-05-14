import { Col, Form } from "antd";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { fullColLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
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
    title: "SKU",
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
    width: 200,
    render: (quantity, record) => {
      return quantity ? (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {quantity}
        </span>
      ) : (
        <CustomInput
          type={"number"}
          name={["product_list", "qty", record?.id]}
          placeholder="quantity"
          noStyle={true}
        />
      );
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 180,
    render: (action, record) => {
      return (
        action && (
          <div className="flex w-full  justify-center items-center gap-3">
            <CustomSelect
              name={["product_list", "action", record?.id]}
              placeholder="Type"
              options={[
                {
                  value: "Addition",
                  label: "Addition (+)",
                },
                {
                  value: "Subtraction",
                  label: "Subtraction (-)",
                },
              ]}
              styleProps={{ width: "9rem" }}
              noStyle={true}
            />
          </div>
        )
      );
    },
  },
  {
    title: <MdDelete className="text-lg md:text-xl text-center w-full" />,
    dataIndex: "delete",
    key: "delete",
    align: "center",
    width: 50,
    fixed: "right",
    render: (props, record) => {
      const { setRowId } = props ?? {};
      return (
        props && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setRowId(record?.id)}
              className="primary-bg p-1 rounded-xl text-white hover:scale-110 duration-300"
            >
              <MdDelete className="text-lg md:text-xl" />
            </button>
          </div>
        )
      );
    },
  },
];

export const ProductTableComponent = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch("product_name", form);
  const warehouseData = Form.useWatch("warehouse_id", form);
  const productListData = Form.useWatch("product_list", form);

  const [rowId, setRowId] = useState(undefined);

  console.log(productData);

  // useEffect(() => {
  //   if (productData && rowId) {
  //     if (productListData?.qty?.[productData?.[rowId]]) {
  //       form.setFieldValue(
  //         ["product_list", "qty", productData[productData?.length - 1]],
  //         1
  //       );
  //       form.setFieldValue(
  //         ["product_list", "action", productData[productData?.length - 1]],
  //         "Addition"
  //       );
  //     }
  //   } else if (productData) {
  //     form.setFieldValue(
  //       ["product_list", "qty", productData?.[productData?.length - 1]],
  //       1
  //     );
  //     form.setFieldValue(
  //       ["product_list", "action", productData?.[productData?.length - 1]],
  //       "Addition"
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productData]);

  useEffect(() => {
    if (rowId) {
      form.setFieldValue(
        "product_name",
        productData?.filter((item) => item !== rowId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowId]);

  const dataSource =
    productData?.map((item) => {
      return {
        id: item,
        name: item,
        action: true,
        delete: {
          setRowId,
        },
      };
    }) ?? [];

  dataSource.push({
    name: "Total",
    quantity:
      productListData &&
      Object.values(productListData?.qty)?.reduce((acc, cur) => acc + cur, 0),
  });

  return (
    <Col {...fullColLayout} className="mb-10">
      {productData && warehouseData && (
        <CustomTable columns={columns} dataSource={dataSource} />
      )}
    </Col>
  );
};
