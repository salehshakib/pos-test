// Import necessary dependencies
import { CUSTOMER } from "../../../utilities/apiEndpoints/people.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const quotationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuotation: build.query({
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

    getQuotationDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${CUSTOMER}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: CUSTOMER, id }],
    }),

    createQuotation: build.mutation({
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

    updateQuotation: build.mutation({
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

    updateQuotationStatus: build.mutation({
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

    deleteQuotation: build.mutation({
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
  useGetAllQuotationQuery,
  useGetQuotationDetailsQuery,
  useCreateQuotationMutation,
  useUpdateQuotationMutation,
  useUpdateQuotationStatusMutation,
  useDeleteQuotationMutation,
} = quotationApi;
