import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { GlobalUtilityStyle } from "../../container/Styled";
import { useCurrentToken } from "../../redux/services/auth/authSlice";
import { useGetAllStockRequestQuery } from "../../redux/services/stockRequest/stockRequestApi";
import { usePagination } from "../../utilities/hooks/usePagination";
import { useGlobalParams } from "../../utilities/hooks/useParams";
import CustomTable from "../Shared/Table/CustomTable";

const StockRequestTable = ({
  newColumns,
  setSelectedRows,
  keyword,
  searchParams,
}) => {
  const token = useSelector(useCurrentToken);

  // const [deleteId, setDeleteId] = useState(undefined);
  // const [deleteModal, setDeleteModal] = useState(false);

  const { pagination, updatePage, updatePageSize } = usePagination();

  const params = useGlobalParams({
    isDefaultParams: false,
    isRelationalParams: true,
    params: { ...pagination, ...searchParams },
    keyword,
  });

  const { data, isLoading } = useGetAllStockRequestQuery(
    { params },
    {
      // skip: !useUrlIndexPermission(),
    }
  );
  const total = data?.meta?.total;

  // const [deleteStockCount, { isLoading: isDeleting }] =
  //   useDeleteStockCountMutation();

  // const handleDeleteModal = (id) => {
  //   setDeleteId(id);
  //   setDeleteModal(true);
  // };

  // const handleFileDownload = (id, format) => {
  //   handleExport(id, format);
  // };

  // const [loading, setLoading] = useState(false);

  // const handleExport = useCallback(
  //   async (id, format) => {
  //     setLoading(true);
  //     const fileUrl = new URL(`${base_url}/${api}/print/${id}`);
  //     const supportedFormats = {
  //       xlsx: "xlsx",
  //       pdf: "pdf",
  //       csv: "csv",
  //     };

  //     if (!supportedFormats[format]) {
  //       console.error("Unsupported file format");
  //       return;
  //     }

  //     fileUrl.searchParams.append("format", format);

  //     try {
  //       const response = await fetch(fileUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to download file");
  //       }

  //       await downloadFile(response, supportedFormats[format], pageTitle);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setLoading(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [api, token]
  // );

  // const handleDelete = async () => {
  //   const { data } = await deleteStockCount(deleteId);
  //   if (data?.success) {
  //     setDeleteModal(false);
  //   }
  // };

  const dataSource =
    data?.results?.stockrequest?.map((item) => {
      const {
        id,
        reference_id,
        created_at,
        from_warehouses,
        to_warehouses,
        // type,
        // warehouses,
        // categories,
        // brands,
        stock_request_products,
      } = item ?? {};

      const date = dayjs(created_at).format("DD-MM-YYYY");

      // const products =
      //   stock_request_products?.map((item) => {
      //     return {
      //       name: item?.products?.name,
      //       alertQty: item?.alert_qty,
      //       needQty: item?.need_qty,
      //     };
      //   }) ?? [];

      return {
        id,
        reference: reference_id,
        fromWarehouse: from_warehouses?.name,
        toWarehouse: to_warehouses?.name,
        created_at: date,
        products: stock_request_products,
      };
    }) ?? [];

  // const hideModal = () => {
  //   setDeleteModal(false);
  // };

  return (
    <GlobalUtilityStyle>
      <CustomTable
        columns={newColumns}
        dataSource={dataSource}
        total={total}
        pagination={pagination}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
        setSelectedRows={setSelectedRows}
        // isLoading={isLoading || loading}
        isLoading={isLoading}
        isRowSelection={true}
        status={false}
        action={false}
      />
    </GlobalUtilityStyle>
  );
};

export default StockRequestTable;
