// import dayjs from "dayjs";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GlobalUtilityStyle } from "../../../container/Styled";
// import {
//   useDeleteQuotationMutation,
//   useGetAllQuotationQuery,
// } from "../../../redux/services/quotation/quotationApi";
// import {
//   openEditDrawer,
//   setEditId,
// } from "../../../redux/services/drawer/drawerSlice";
// import { selectPagination } from "../../../redux/services/pagination/paginationSlice";
// import DeleteModal from "../../Shared/Modal/DeleteModal";
// import CustomTable from "../../Shared/Table/CustomTable";
// import QuotationEdit from "./QuotationEdit";
// import { QuotationDetails } from "../Generator/Quotation/overview/QuotationDetails";

// const QuotationTable = ({ newColumns, setSelectedRows }) => {
//   const dispatch = useDispatch();
//   const pagination = useSelector(selectPagination);

//   const { editId } = useSelector((state) => state.drawer);

//   const [detailsId, setDetailsId] = useState(undefined);
//   const [detailsModal, setDetailsModal] = useState(false);

//   // const [statusId, setStatusId] = useState(undefined);
//   // const [statusModal, setStatusModal] = useState(false);

//   const [deleteId, setDeleteId] = useState(undefined);
//   const [deleteModal, setDeleteModal] = useState(false);

//   const { data, isLoading } = useGetAllQuotationQuery({
//     params: { ...pagination, parent: 1, child: 1 },
//   });

//   const total = data?.meta?.total;

//   // const [updateStatus, { isLoading: isStatusUpdating }] =
//   //   useUpdateCustomerStatusMutation();

//   const [deleteQuotation, { isLoading: isDeleting }] =
//     useDeleteQuotationMutation();

//   const handleDetailsModal = (id) => {
//     setDetailsId(id);
//     setDetailsModal(true);
//   };

//   const handleEdit = (id) => {
//     dispatch(setEditId(id));
//     dispatch(openEditDrawer());
//   };

//   // const handleStatusModal = (id) => {
//   //   setStatusId(id);
//   //   setStatusModal(true);
//   // };

//   // const handleStatus = async () => {
//   //   const { data } = await updateStatus(statusId);

//   //   if (data?.success) {
//   //     setStatusId(undefined);
//   //     setStatusModal(false);
//   //   }
//   // };

//   const handleDeleteModal = (id) => {
//     setDeleteId(id);
//     setDeleteModal(true);
//   };

//   const handleDelete = async () => {
//     const { data } = await deleteQuotation(deleteId);
//     if (data?.success) {
//       setDeleteModal(false);
//     }
//   };

//   console.log(data);

//   const dataSource =
//     data?.results?.quotation?.map((item) => {
//       const {
//         id,
//         name,
//         email,
//         company_name: companyName,
//         phone_number: phone,
//         address,
//         created_at,
//         warehouses,
//       } = item ?? {};
//       const date = dayjs(created_at).format("DD-MM-YYYY");

//       return {
//         id,
//         name: { name, email },
//         companyName,
//         phone,
//         address,
//         created_at: date,
//         handleDetailsModal,
//         handleEdit,
//         handleDeleteModal,
//       };
//     }) ?? [];

//   const hideModal = () => {
//     // setStatusModal(false);
//     setDeleteModal(false);
//   };

//   return (
//     <GlobalUtilityStyle>
//       <CustomTable
//         columns={newColumns}
//         dataSource={dataSource}
//         total={total}
//         setSelectedRows={setSelectedRows}
//         isLoading={isLoading}
//         isRowSelection={true}
//       />

//       <QuotationEdit id={editId} />
//       {detailsId && (
//         <QuotationDetails
//           id={detailsId}
//           openModal={detailsModal}
//           hideModal={hideModal}
//         />
//       )}

//       {/* <StatusModal
//         statusModal={statusModal}
//         hideModal={hideModal}
//         handleStatus={handleStatus}
//         isLoading={isStatusUpdating}
//       /> */}

//       <DeleteModal
//         deleteModal={deleteModal}
//         hideModal={hideModal}
//         handleDelete={handleDelete}
//         isLoading={isDeleting}
//         item={"quotation"}
//       />
//     </GlobalUtilityStyle>
//   );
// };

// export default QuotationTable;
