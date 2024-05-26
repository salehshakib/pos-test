// Import necessary dependencies
import { CUSTOMER } from "../../../utilities/apiEndpoints/people.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const transferApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTransfer: build.query({
      query: ({ params }) => ({
        url: `/${CUSTOMER}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: CUSTOMER, params },
        CUSTOMER,
      ],
    }),

    getTransferDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${CUSTOMER}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: CUSTOMER, id }],
    }),

    createTransfer: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${CUSTOMER}/store`,
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
        return result ? [CUSTOMER] : [];
      },
    }),

    updateTransfer: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${CUSTOMER}/update/${id}`,
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
        return result ? [CUSTOMER] : [];
      },
    }),

    updateTransferStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${CUSTOMER}/status/${id}`,
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
        return result ? [CUSTOMER] : [];
      },
    }),

    deleteTransfer: build.mutation({
      query: (id) => {
        return {
          url: `/${CUSTOMER}/delete/${id}`,
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
        return result ? [CUSTOMER] : [];
      },
    }),
  }),
});

export const {
  useGetAllTransferQuery,
  useGetTransferDetailsQuery,
  useCreateTransferMutation,
  useUpdateTransferMutation,
  useUpdateTransferStatusMutation,
  useDeleteTransferMutation,
} = transferApi;
