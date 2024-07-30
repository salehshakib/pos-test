// Import necessary dependencies
import { SALE_REPORT } from "../../../utilities/apiEndpoints/report.api";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const saleReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchaseCalenderReport: build.query({
      query: ({ params }) => ({
        url: `/${SALE_REPORT}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: SALE_REPORT, ...params },
        SALE_REPORT,
      ],
    }),

    // getPurchaseReportDetails: build.query({
    //   query: ({ id, params }) => {
    //     return {
    //       url: `${SALE_REPORT}/show/${id}`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response) => verifyToken(response.data),
    //   providesTags: (result, error, { id }) => [{ type: SALE_REPORT, id }],
    // }),

    // createPurchaseReport: build.mutation({
    //   query: ({ data }) => {
    //     return {
    //       url: `/${SALE_REPORT}/store`,
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
    //     return result ? [{ type: SALE_REPORT }] : [];
    //   },
    // }),

    // updatePurchaseReport: build.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/${SALE_REPORT}/update/${id}`,
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
    //     return result ? [{ type: SALE_REPORT }] : [];
    //   },
    // }),

    // updatePurchaseReportStatus: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${SALE_REPORT}/status/${id}`,
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
    //     return result ? [{ type: SALE_REPORT }] : [];
    //   },
    // }),

    // deletePurchaseReport: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${SALE_REPORT}/delete/${id}`,
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
    //     return result ? [{ type: SALE_REPORT }] : [];
    //   },
    // }),
  }),
});

export const {
  useGetSaleCalenderReportQuery,
  //   useGetPurchaseReportDetailsQuery,
  //   useCreatePurchaseReportMutation,
  //   useUpdatePurchaseReportMutation,
  //   useUpdatePurchaseReportStatusMutation,
  //   useDeletePurchaseReportMutation,
} = saleReportApi;
