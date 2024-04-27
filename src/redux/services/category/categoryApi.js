import { CATEGORY } from "../../../utilities/configs/Api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query({
      query: ({ params }) => {
        return {
          url: `/${CATEGORY}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: CATEGORY, params },
        CATEGORY,
      ],
    }),
    getCategoryDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${CATEGORY}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [CATEGORY],
    }),
    createCategory: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${CATEGORY}/store`,
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
        return result ? [CATEGORY] : [];
      },
    }),
    updateCategory: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${CATEGORY}/update/${data?.id}`,
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
        return result ? [CATEGORY] : [];
      },
    }),
    updateCategoryStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${CATEGORY}/status/${id}`,
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
        return result ? [CATEGORY] : [];
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `/${CATEGORY}/delete/${id}`,
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
        return result ? [CATEGORY] : [];
      },
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
  useDeleteCategoryMutation,
} = categoryApi;
