// Import necessary dependencies
import { PURCHASE_REPORT } from '../../../utilities/apiEndpoints/report.api';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const purchaseReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchaseCalenderReport: build.query({
      query: ({ params }) => ({
        url: `/${PURCHASE_REPORT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PURCHASE_REPORT, ...params },
        PURCHASE_REPORT,
      ],
    }),

    // getPurchaseReportDetails: build.query({
    //   query: ({ id, params }) => {
    //     return {
    //       url: `${PURCHASE_REPORT}/show/${id}`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response) => verifyToken(response.data),
    //   providesTags: (result, error, { id }) => [{ type: PURCHASE_REPORT, id }],
    // }),

    // createPurchaseReport: build.mutation({
    //   query: ({ data }) => {
    //     return {
    //       url: `/${PURCHASE_REPORT}/store`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   transformErrorResponse: (response) => {
    //     if (response?.data?.success === false) {
    //       openNotification("error", response?.data?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: PURCHASE_REPORT }] : [];
    //   },
    // }),

    // updatePurchaseReport: build.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/${PURCHASE_REPORT}/update/${id}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: PURCHASE_REPORT }] : [];
    //   },
    // }),

    // updatePurchaseReportStatus: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${PURCHASE_REPORT}/status/${id}`,
    //       method: "POST",
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: PURCHASE_REPORT }] : [];
    //   },
    // }),

    // deletePurchaseReport: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${PURCHASE_REPORT}/delete/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: PURCHASE_REPORT }] : [];
    //   },
    // }),
  }),
});

export const {
  useGetPurchaseCalenderReportQuery,
  //   useGetPurchaseReportDetailsQuery,
  //   useCreatePurchaseReportMutation,
  //   useUpdatePurchaseReportMutation,
  //   useUpdatePurchaseReportStatusMutation,
  //   useDeletePurchaseReportMutation,
} = purchaseReportApi;
