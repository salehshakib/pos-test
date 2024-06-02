import { useBreakpoint } from "@ant-design/pro-components";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GlobalUtilityStyle } from "../../container/Styled";
import CustomInput from "../Shared/Input/CustomInput";
import CustomTable from "../Shared/Table/CustomTable";

const ProductTableComponent = () => {
  const form = Form.useFormInstance();

  const screens = useBreakpoint();
  const isMobile = screens === "xs" || screens === "sm" || screens === "md";

  const tableStyleProps = {
    scroll: { y: isMobile ? 200 : 300, x: 600 },
  };

  const [counters, setCounters] = useState({});

  const incrementCounter = (id, stock = 5) => {
    if (counters[id] >= stock) return;

    if (counters[id] === undefined) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 2,
      }));
      return;
    }

    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  const decrementCounter = (id) => {
    if (counters[id] <= 0) return;

    if (!counters[id]) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 0,
      }));
      return;
    }

    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) - 1,
    }));
  };

  // useEffect(()=> {
  //   form.setFieldValue(['product_list', 'qty'], counters)
  // }, [counters])

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {id}
        </span>
      ),
    },
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
      width: 150,
      render: (quantity, record) => {
        return quantity >= 0 ? (
          <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
            {quantity}
          </span>
        ) : (
          <div className="flex gap-1 justify-center items-center">
            <div>
              <Button
                key={"sub"}
                icon={<FaMinus />}
                type="primary"
                onClick={() => decrementCounter(record?.id)}
              />
            </div>
            <CustomInput
              type={"number"}
              name={["product_list", "qty", record?.id]}
              placeholder="quantity"
              noStyle={true}
            />
            <div>
              <Button
                key={"add"}
                icon={<FaPlus />}
                type="primary"
                onClick={() => incrementCounter(record?.id)}
                className=""
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "center",
      render: (subTotal) => (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {subTotal}
        </span>
      ),
    },
    {
      // title: <MdDelete className="text-lg md:text-xl text-center w-full" />,
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

  const [dataSource, setDataSource] = useState([]);

  const dummyData = [
    {
      key: "1",
      name: "Product A",
      sku: "A123",
      unitCost: "$10.00",
      subTotal: "$10.00",
      delete: {
        setRowId: (id) => console.log(`Deleting row with id: ${id}`),
      },
      id: 1,
    },
    {
      key: "2",
      name: "Product B",
      sku: "B456",
      unitCost: "$20.00",
      subTotal: "$20.00",
      delete: {
        setRowId: (id) => console.log(`Deleting row with id: ${id}`),
      },
      id: 2,
    },
    {
      key: "3",
      name: "Product C",
      sku: "C789",
      unitCost: "$30.00",
      subTotal: "$30.00",
      delete: {
        setRowId: (id) => console.log(`Deleting row with id: ${id}`),
      },
      id: 3,
    },
    {
      key: "4",
      name: "Product D",
      sku: "D012",
      unitCost: "$40.00",
      subTotal: "$40.00",
      delete: {
        setRowId: (id) => console.log(`Deleting row with id: ${id}`),
      },
      id: 4,
    },
    {
      key: "5",
      name: "Product E",
      sku: "E345",
      unitCost: "$50.00",
      subTotal: "$50.00",
      delete: {
        setRowId: (id) => console.log(`Deleting row with id: ${id}`),
      },
      id: 5,
    },
  ];

  useEffect(() => {
    setDataSource(
      dummyData.map((item) => {
        return {
          ...item,
          quantity: form.setFieldValue(
            ["product_list", "qty", item.id],
            counters[item.id] ?? 1
          ),
        };
      }) ?? []
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counters, form]);

  // useEffect(() => {
  //   setDataSource((prevDataSource) =>
  //     prevDataSource.map((item) => ({
  //       ...item,
  //       quantity: form.setFieldValue(
  //         ["product_list", "qty", item.id],
  //         counters[item.id]
  //       ),
  //     }))
  //   );
  // }, [counters, form]);

  return (
    <GlobalUtilityStyle className="h-full">
      <div
        className="border p-2 bg-white rounded-lg shadow-md h-full
      overflow-hidden flex flex-col gap-2"
      >
        <div className="flex-grow">
          <CustomTable
            columns={columns}
            dataSource={dataSource}
            showPaging={false}
            tableStyleProps={tableStyleProps}
          />
        </div>

        <hr />
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-1 xl:gap-2">
          <div className="grid grid-cols-2">
            <span>Items</span>
            <span>0</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Total</span>
            <span>0</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline">
              Discount
              <FaRegEdit className="primary-text" />
            </span>
            <span>0</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline">
              Coupon
              <FaRegEdit className="primary-text" />
            </span>
            <span>0</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline ">
              Tax
              <FaRegEdit className="primary-text" />
            </span>
            <span>0</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="flex justify-start items-center gap-2 hover:cursor-pointer hover:underline">
              Shipping
              <FaRegEdit className="primary-text" />
            </span>
            <span>0</span>
          </div>
        </div>

        <div className="text-center secondary-bg primary-text text-lg lg:text-xl py-1 lg:py-3 font-semibold rounded-sm">
          Grand Total
        </div>

        <Button
          type="primary"
          // icon={<MdOutlineCancel />}
          onClick={() => form.resetFields()}
          className=" flex justify-center items-center gap-2"
        >
          Reset
        </Button>
      </div>
    </GlobalUtilityStyle>
  );
};

export default ProductTableComponent;
