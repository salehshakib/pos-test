import { UNIT } from "../../../utilities/apiEndpoints/helper.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUnit: build.query({
      query: ({ params }) => {
        return {
          url: `/${UNIT}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: UNIT, params },
        UNIT,
      ],
    }),
    createUnit: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${UNIT}/store`,
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
        return result ? [UNIT] : [];
      },
    }),
    deleteUnit: build.mutation({
      query: (id) => {
        return {
          url: `/${UNIT}/delete/${id}`,
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
        return result ? [UNIT] : [];
      },
    }),
  }),
});

export const {
  useGetAllUnitQuery,
  useCreateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
