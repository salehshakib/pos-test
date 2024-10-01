import {
  PRODUCT,
  PRODUCT_VARIANTS,
  STOCK_MANAGE,
} from '../../../utilities/apiEndpoints/inventory.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: ({ params }) => {
        return {
          url: `/${PRODUCT}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PRODUCT, ...params },
        PRODUCT,
      ],
    }),

    getAllProductVariants: build.query({
      query: ({ params }) => {
        return {
          url: `/${PRODUCT_VARIANTS}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PRODUCT_VARIANTS, ...params },
        PRODUCT_VARIANTS,
      ],
    }),

    getProductDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${PRODUCT}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: PRODUCT, id }],
    }),

    getProductVariantDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${PRODUCT}/variants/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: PRODUCT, id }],
    }),

    createProduct: build.mutation({
      query: ({ formData }) => {
        return {
          url: `/${PRODUCT}/store`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),
    createStockManage: build.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/${STOCK_MANAGE}/${id}`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    updateStockManage: build.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/${STOCK_MANAGE}/update/${id}`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    updateProduct: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/${PRODUCT}/update/${id}`,
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    updateProductStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${PRODUCT}/status/${id}`,
          method: 'POST',
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),

    deleteProduct: build.mutation({
      query: (id) => {
        return {
          url: `/${PRODUCT}/delete/${id}`,
          method: 'DELETE',
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: PRODUCT }] : [];
      },
    }),
    deleteProductVariant: build.mutation({
      query: (id) => {
        return {
          url: `/${PRODUCT_VARIANTS}/delete/${id}`,
          method: 'DELETE',
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification('error', response?.data?.message);
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
  useGetAllProductsQuery,
  useGetAllProductVariantsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
  useCreateStockManageMutation,
  useUpdateStockManageMutation,
  useDeleteProductVariantMutation,
  useGetProductVariantDetailsQuery,
} = productApi;
