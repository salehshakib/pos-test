import { BRAND } from "../../../utilities/apiEndpoints/inventory.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: ({ params }) => {
        return {
          url: `/${BRAND}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: BRAND, params },
        BRAND,
      ],
    }),
    getBrandDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${BRAND}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [BRAND],
    }),
    createBrand: build.mutation({
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
      invalidatesTags: (result) => {
        return result ? [BRAND] : [];
      },
    }),
    updateBrand: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${BRAND}/update/${id}`,
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
        return result ? [BRAND] : [];
      },
    }),
    updateBrandStatus: build.mutation({
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
    deleteBrand: build.mutation({
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
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useUpdateBrandStatusMutation,
  useDeleteBrandMutation,
} = brandApi;
