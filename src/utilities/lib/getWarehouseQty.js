export function getWarehouseQuantity(data, warehouseId) {
  const item =
    data &&
    data?.find(
      (item) => item.warehouse_id?.toString() === warehouseId?.toString()
    );
  return item ? parseInt(item.qty) : 0;
}
