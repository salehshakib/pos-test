import { MdDelete } from "react-icons/md";
import CustomInput from "../Shared/Input/CustomInput";
import CustomTable from "../Shared/Table/CustomTable";
import { FaRegEdit } from "react-icons/fa";
import { GlobalUtilityStyle } from "../../container/Styled";

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

const ProductTableComponent = () => {
  return (
    <GlobalUtilityStyle>
      <div className="border p-2 bg-white rounded-lg shadow-md mt-5 h-[90vh] lg:h-[680px] overflow-hidden flex flex-col gap-2">
        <div className="flex-grow overflow-auto">
          <CustomTable
            columns={columns}
            //   dataSource={dataSource}
            showPaging={false}
          />
        </div>

        <hr />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
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
      </div>
    </GlobalUtilityStyle>
  );
};

export default ProductTableComponent;
