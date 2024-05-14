import { ADJUSTMENT } from "../../../utilities/apiEndpoints/inventory.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const adjustmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdjustment: build.query({
      query: ({ params }) => {
        return {
          url: `/${ADJUSTMENT}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ADJUSTMENT, params },
        ADJUSTMENT,
      ],
    }),

    getAdjustmentDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${ADJUSTMENT}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [ADJUSTMENT],
    }),

    createAdjustment: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ADJUSTMENT}/store`,
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
        return result ? [ADJUSTMENT] : [];
      },
    }),

    updateAdjustment: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ADJUSTMENT}/update/${data?.id}`,
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
        return result ? [ADJUSTMENT] : [];
      },
    }),

    updateAdjustmentStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${ADJUSTMENT}/status/${id}`,
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
        return result ? [ADJUSTMENT] : [];
      },
    }),

    deleteAdjustment: build.mutation({
      query: (id) => {
        return {
          url: `/${ADJUSTMENT}/delete/${id}`,
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
        return result ? [ADJUSTMENT] : [];
      },
    }),
  }),
});

export const {
  useGetAllAdjustmentQuery,
  useGetAdjustmentDetailsQuery,
  useCreateAdjustmentMutation,
  useUpdateAdjustmentMutation,
  useUpdateAdjustmentStatusMutation,
  useDeleteAdjustmentMutation,
} = adjustmentApi;
