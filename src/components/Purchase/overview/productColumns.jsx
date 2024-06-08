import { columns } from "../../Sale/overview/productColumns";

export const ProductColumns = (type) => {
  const baseColumns = columns;

  if (type === "partial") {
    const quantityIndex = baseColumns.findIndex(
      (column) => column.key === "quantity"
    );
    const receivedColumn = {
      title: "Received",
      dataIndex: "received",
      key: "received",
      align: "center",
      render: (received) => (
        <span className="text-xs font-medium md:text-sm text-dark dark:text-white87">
          {received}
        </span>
      ),
    };
    if (quantityIndex > -1) {
      baseColumns.splice(quantityIndex + 1, 0, receivedColumn);
    }
  }

  return baseColumns;
};
