import { Col, Form } from "antd";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { fullColLayout } from "../Shared/Form/FormLayout";
import CustomInput from "../Shared/Input/CustomInput";
import CustomSelect from "../Shared/Select/CustomSelect";
import CustomTable from "../Shared/Table/CustomTable";
import { useSelector } from "react-redux";

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
    dataIndex: "sku",
    key: "sku",
    align: "center",
    render: (sku) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {sku}
      </span>
    ),
  },
  {
    title: "Unit Cost",
    dataIndex: "unitCost",
    key: "unitCost",
    align: "center",
    render: (unitCost) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {unitCost}
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
              type="button"
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

  useEffect(() => {
    if (productData?.length > 0) {
      if (rowId !== undefined) {
        const selectedProduct = productData[rowId];

        form.setFieldValue(["product_list", "qty", selectedProduct], 1);
        form.setFieldValue(
          ["product_list", "action", selectedProduct],
          "Addition"
        );

        setRowId(undefined);
      } else if (productData?.length > 0 && productData) {
        const lastProductIndex = productData.length - 1;

        if (lastProductIndex >= 0) {
          const lastProduct = productData[lastProductIndex];

          form.setFieldValue(["product_list", "qty", lastProduct], 1);
          form.setFieldValue(
            ["product_list", "action", lastProduct],
            "Addition"
          );
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

  const { productDetails } = useSelector((state) => state.product);

  const filteredProducts = productDetails.filter((product) =>
    productData?.includes(product.value)
  );

  const dataSource =
    filteredProducts?.map(({ value, label, sku, unitCost }) => {
      return {
        id: value,
        name: label,
        sku,
        unitCost,
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
  });

  return (
    <Col {...fullColLayout} className="mb-10">
      {productData?.length > 0 && warehouseData && (
        <CustomTable columns={columns} dataSource={dataSource} />
      )}
    </Col>
  );
};
