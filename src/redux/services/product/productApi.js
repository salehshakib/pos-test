import { PRODUCT } from "../../../utilities/apiEndpoints/inventory.api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ params }) => {
        return {
          url: `/${PRODUCT}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PRODUCT, params },
        PRODUCT,
      ],
    }),

    getProductDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${PRODUCT}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [PRODUCT],
    }),

    createProduct: build.mutation({
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
      invalidatesTags: (result) => {
        return result ? [PRODUCT] : [];
      },
    }),

    updateProduct: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${PRODUCT}/update/${data?.id}`,
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
        return result ? [PRODUCT] : [];
      },
    }),

    updateProductStatus: build.mutation({
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
        return result ? [PRODUCT] : [];
      },
    }),

    deleteProduct: build.mutation({
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
        return result ? [PRODUCT] : [];
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productApi;
