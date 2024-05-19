/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from "antd";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import CustomInput from "../Shared/Input/CustomInput";
import CustomTable from "../Shared/Table/CustomTable";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: 150,
    render: (name) => (
      <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
        {name}
      </span>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "qty",
    align: "center",
    render: (qty, record) => {
      return qty >= 0 ? (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {qty}
        </span>
      ) : (
        <CustomInput
          type={"number"}
          name={["price_list", "qty", record?.id]}
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

export const WarehouseStockTableComponent = () => {
  const form = Form.useFormInstance();
  const warehouse = Form.useWatch("warehouse_id", form);

  //   const price_diff_warehouse = Form.useWatch("price_list", form);

  const [rowId, setRowId] = useState(undefined);

  useEffect(() => {
    if (warehouse?.length > 0) {
      if (rowId !== undefined) {
        const selectedProduct = warehouse[rowId];

        form.setFieldValue(["price_list", "qty", selectedProduct], 1);

        setRowId(undefined);
      } else if (warehouse?.length > 0 && warehouse) {
        const lastProductIndex = warehouse.length - 1;

        if (lastProductIndex >= 0) {
          const lastProduct = warehouse[lastProductIndex];

          form.setFieldValue(["price_list", "qty", lastProduct], 1);
        }
      }
    }
  }, [warehouse]);

  useEffect(() => {
    if (rowId !== undefined) {
      const updatedProductData = warehouse?.filter((item) => item !== rowId);

      form.setFieldValue("warehouse_id", updatedProductData);
    }
  }, [rowId]);

  const dataSource = warehouse?.map((item) => {
    return {
      id: item,
      name: item,
      delete: {
        setRowId,
      },
    };
  });

  return <CustomTable columns={columns} dataSource={dataSource} />;
};
