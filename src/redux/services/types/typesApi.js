import { TYPE } from "../../../utilities/apiEndpoints/helper.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const typesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTypes: build.query({
      query: ({ params }) => {
        return {
          url: `/${TYPE}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: TYPE, params },
        TYPE,
      ],
    }),
    createType: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${TYPE}/store`,
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
        return result ? [TYPE] : [];
      },
    }),
    deleteType: build.mutation({
      query: (id) => {
        return {
          url: `/${TYPE}/delete/${id}`,
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
        return result ? [TYPE] : [];
      },
    }),
  }),
});

export const {
  useGetTypesQuery,
  useCreateTypeMutation,
  useDeleteTypeMutation,
} = typesApi;
