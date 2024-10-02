// Import necessary dependencies
import {
  ATTRIBUTE,
  VARIANT_OPTIONS,
} from '../../../utilities/apiEndpoints/inventory.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const variantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVariants: build.query({
      query: ({ params }) => ({
        url: `/${ATTRIBUTE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ATTRIBUTE, params },
        ATTRIBUTE,
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
          url: `${ATTRIBUTE}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: ATTRIBUTE, id }],
    }),

    createVariants: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ATTRIBUTE}/store`,
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
        return result ? [{ type: ATTRIBUTE }, { type: VARIANT_OPTIONS }] : [];
      },
    }),

    updateVariants: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${ATTRIBUTE}/update/${id}`,
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
        return result ? [{ type: ATTRIBUTE }] : [];
      },
    }),

    updateVariantsStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${ATTRIBUTE}/status/${id}`,
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
        return result ? [{ type: ATTRIBUTE }] : [];
      },
    }),

    deleteVariants: build.mutation({
      query: (id) => {
        return {
          url: `/${ATTRIBUTE}/delete/${id}`,
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
        return result ? [{ type: ATTRIBUTE }] : [];
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
