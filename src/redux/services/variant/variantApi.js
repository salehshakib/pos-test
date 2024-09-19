// Import necessary dependencies
import {
  VARIANT,
  VARIANT_OPTIONS,
} from '../../../utilities/apiEndpoints/inventory.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const variantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVariants: build.query({
      query: ({ params }) => ({
        url: `/${VARIANT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: VARIANT, params },
        VARIANT,
      ],
    }),

    getAllVariantOptions: build.query({
      query: ({ params }) => ({
        url: `/${VARIANT_OPTIONS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: VARIANT_OPTIONS, params },
        VARIANT_OPTIONS,
      ],
    }),

    getVariantsDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${VARIANT}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: VARIANT, id }],
    }),

    createVariants: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${VARIANT}/store`,
          method: 'POST',
          body: data,
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
        return result ? [{ type: VARIANT }, { type: VARIANT_OPTIONS }] : [];
      },
    }),

    updateVariants: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${VARIANT}/update/${id}`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: VARIANT }] : [];
      },
    }),

    updateVariantsStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${VARIANT}/status/${id}`,
          method: 'POST',
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: VARIANT }] : [];
      },
    }),

    deleteVariants: build.mutation({
      query: (id) => {
        return {
          url: `/${VARIANT}/delete/${id}`,
          method: 'DELETE',
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification('success', response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [{ type: VARIANT }] : [];
      },
    }),
  }),
});

export const {
  useGetAllVariantsQuery,
  useGetVariantsDetailsQuery,
  useGetAllVariantOptionsQuery,
  useCreateVariantsMutation,
  useUpdateVariantsMutation,
  useUpdateVariantsStatusMutation,
  useDeleteVariantsMutation,
} = variantApi;
