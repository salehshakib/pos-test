// Import necessary dependencies
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const saleReturnApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSaleReturn: build.query({
      query: ({ params }) => ({
        url: `/${BRAND}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: BRAND, params },
        BRAND,
      ],
    }),

    getSaleReturnDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${BRAND}/show/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: BRAND, id }],
    }),

    createSaleReturn: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${BRAND}/store`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification("error", response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [BRAND] : [];
      },
    }),

    updateSaleReturn: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${BRAND}/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [BRAND] : [];
      },
    }),

    updateSaleReturnStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${BRAND}/status/${id}`,
          method: "POST",
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [BRAND] : [];
      },
    }),

    deleteSaleReturn: build.mutation({
      query: (id) => {
        return {
          url: `/${BRAND}/delete/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [BRAND] : [];
      },
    }),

    exportSaleReturn: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${BRAND}/export`,
          method: "GET",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
    }),
  }),
});

export const {
  useGetAllSaleReturnQuery,
  useGetSaleReturnDetailsQuery,
  useCreateSaleReturnMutation,
  useUpdateSaleReturnMutation,
  useUpdateSaleReturnStatusMutation,
  useDeleteSaleReturnMutation,
  useExportSaleReturnMutation,
} = saleReturnApi;
