// Import necessary dependencies
import { PRODUCT } from "../../../utilities/apiEndpoints/inventory.api";
import { openNotification } from "../../../utilities/lib/openToaster";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDashboardData: build.query({
      query: ({ params }) => ({
        url: `/${PRODUCT}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PRODUCT, ...params },
        PRODUCT,
      ],
    }),

    getDashboardDataDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${PRODUCT}/show/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: PRODUCT, id }],
    }),

    createDashboardData: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${PRODUCT}/store`,
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
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    updateDashboardData: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${PRODUCT}/update/${id}`,
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
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    updateDashboardDataStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${PRODUCT}/status/${id}`,
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
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    deleteDashboardData: build.mutation({
      query: (id) => {
        return {
          url: `/${PRODUCT}/delete/${id}`,
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
        return result ? [{ type: PRODUCT }] : [];
      },
    }),
  }),
});

export const {
  useGetAllDashboardDataQuery,
  useGetDashboardDataDetailsQuery,
  useCreateDashboardDataMutation,
  useUpdateDashboardDataMutation,
  useUpdateDashboardDataStatusMutation,
  useDeleteDashboardDataMutation,
} = dashboardApi;
