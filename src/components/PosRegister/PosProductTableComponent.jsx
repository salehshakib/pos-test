import { MdDelete, MdOutlineCancel } from "react-icons/md";
import CustomInput from "../Shared/Input/CustomInput";
import CustomTable from "../Shared/Table/CustomTable";
import { FaRegEdit } from "react-icons/fa";
import { GlobalUtilityStyle } from "../../container/Styled";
import { Button } from "antd";
import { useBreakpoint } from "@ant-design/pro-components";
import { useState } from "react";

const dataSource = [
  {
    key: "1",
    name: "Product A",
    sku: "A123",
    unitCost: "$10.00",
    quantity: 15,
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
    quantity: 0, // This will render the CustomInput component for quantity
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
    quantity: 5, // This will render the CustomInput component for quantity
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
    quantity: 25,
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
    quantity: 5,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 5,
  },
  {
    key: "6",
    name: "Product F",
    sku: "F678",
    unitCost: "$60.00",
    quantity: 30,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 6,
  },
  {
    key: "7",
    name: "Product G",
    sku: "G901",
    unitCost: "$70.00",
    quantity: -10, // This will render the CustomInput component for quantity
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 7,
  },
  {
    key: "8",
    name: "Product H",
    sku: "H234",
    unitCost: "$80.00",
    quantity: 50,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 8,
  },
  {
    key: "9",
    name: "Product I",
    sku: "I567",
    unitCost: "$90.00",
    quantity: 20,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 9,
  },
  {
    key: "10",
    name: "Product J",
    sku: "J890",
    unitCost: "$100.00",
    quantity: -3, // This will render the CustomInput component for quantity
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 10,
  },
  {
    key: "11",
    name: "Product K",
    sku: "K123",
    unitCost: "$110.00",
    quantity: 8,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 11,
  },
  {
    key: "12",
    name: "Product L",
    sku: "L456",
    unitCost: "$120.00",
    quantity: 12,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 12,
  },
  {
    key: "13",
    name: "Product M",
    sku: "M789",
    unitCost: "$130.00",
    quantity: -2, // This will render the CustomInput component for quantity
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 13,
  },
  {
    key: "14",
    name: "Product N",
    sku: "N012",
    unitCost: "$140.00",
    quantity: 20,
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 14,
  },
  {
    key: "15",
    name: "Product O",
    sku: "O345",
    unitCost: "$150.00",
    quantity: 0, // This will render the CustomInput component for quantity
    delete: {
      setRowId: (id) => console.log(`Deleting row with id: ${id}`),
    },
    id: 15,
  },
];

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
    // width: 200,
    render: (quantity, record) => {
      // const [counter, setCounter] = useState(0);

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

const ProductTableComponent = () => {
  const screens = useBreakpoint();
  const isMobile =
    screens === "xs" ||
    screens === "sm" ||
    screens === "md" ||
    screens === "lg";

  const tableStyleProps = {
    scroll: { y: isMobile ? 200 : 260 },
  };

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
          className=" flex justify-center items-center gap-2"
        >
          Reset
        </Button>
      </div>
    </GlobalUtilityStyle>
  );
};

export default ProductTableComponent;
