import { Col, Form } from "antd";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { fullColLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
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
  // {
  //   title: "SKU",
  //   dataIndex: "code",
  //   key: "code",
  //   align: "center",
  //   render: (code) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {code}
  //     </span>
  //   ),
  // },
  // {
  //   title: "Unit Cost",
  //   dataIndex: "cost",
  //   key: "cost",
  //   align: "center",
  //   render: (cost) => (
  //     <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
  //       {cost}
  //     </span>
  //   ),
  // },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 200,
    render: (quantity, record) => {
      return quantity >= 0 ? (
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
    title: "UnitPrice",
    dataIndex: "unitPrice",
    key: "unitPrice",
    align: "center",
    width: 200,
    render: (unitPrice, record) => {
      return unitPrice >= 0 ? (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {unitPrice}
        </span>
      ) : (
        <CustomInput
          type={"number"}
          name={["product_list", "unit_price", record?.id]}
          placeholder="quantity"
          noStyle={true}
        />
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

const ComboTableComponent = () => {
  const form = Form.useFormInstance();
  const productData = Form.useWatch("product_name", form);
  const productListData = Form.useWatch("product_list", form);

  const [rowId, setRowId] = useState(undefined);

  useEffect(() => {
    if (productData?.length > 0) {
      if (rowId !== undefined) {
        const selectedProduct = productData[rowId];

        form.setFieldValue(["product_list", "qty", selectedProduct], 1);
        form.setFieldValue(["product_list", "unit_price", selectedProduct], 0);

        setRowId(undefined);
      } else if (productData?.length > 0 && productData) {
        const lastProductIndex = productData.length - 1;

        console.log(lastProductIndex);
        if (lastProductIndex >= 0) {
          const lastProduct = productData[lastProductIndex];

          form.setFieldValue(["product_list", "qty", lastProduct], 1);
          form.setFieldValue(["product_list", "unit_price", lastProduct], 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  useEffect(() => {
    if (rowId !== undefined) {
      const updatedProductData = productData?.filter((item) => item !== rowId);

      form.setFieldValue("product_name", updatedProductData);
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
    quantity: productListData
      ? Object.values(productListData?.qty)?.reduce((acc, cur) => acc + cur, 0)
      : -1,
    unitPrice: productListData
      ? Object.values(productListData?.unit_price)?.reduce(
          (acc, cur) => acc + cur,
          0
        )
      : -1,
  });

  return (
    <Col {...fullColLayout} className={`${productData && "mb-10"}`}>
      {productData?.length > 0 && (
        <CustomTable columns={columns} dataSource={dataSource} />
      )}
    </Col>
  );
};

export default ComboTableComponent;
