// Import necessary dependencies
import {
  ATTRIBUTE,
  ATTRIBUTE_OPTION,
} from '../../../utilities/apiEndpoints/inventory.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const attributeOption = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAttributeOption: build.query({
      query: ({ params }) => ({
        url: `/${ATTRIBUTE_OPTION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ATTRIBUTE, params },
        { type: ATTRIBUTE_OPTION, params },
        ATTRIBUTE,
        ATTRIBUTE_OPTION,
      ],
    }),

    getAllVariantOptions: build.query({
      query: ({ params }) => ({
        url: `/${ATTRIBUTE_OPTION}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ATTRIBUTE_OPTION, params },
        { type: ATTRIBUTE, params },
        ATTRIBUTE_OPTION,
        ATTRIBUTE,
      ],
    }),

    getAttributeOptionDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${ATTRIBUTE_OPTION}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [
        { type: ATTRIBUTE, id },
        { type: ATTRIBUTE_OPTION, id },
        ATTRIBUTE_OPTION,
        ATTRIBUTE,
      ],
    }),

    createAttributeOption: build.mutation({
      query: ({ formData }) => {
        return {
          url: `/${ATTRIBUTE_OPTION}/store`,
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
        return result ? [{ type: ATTRIBUTE_OPTION }, { type: ATTRIBUTE }] : [];
      },
    }),

    updateAttributeOption: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/${ATTRIBUTE_OPTION}/update/${id}`,
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
      invalidatesTags: (result) => {
        return result ? [{ type: ATTRIBUTE }, { type: ATTRIBUTE_OPTION }] : [];
      },
    }),

    deleteAttributeOption: build.mutation({
      query: (id) => {
        return {
          url: `/${ATTRIBUTE_OPTION}/delete/${id}`,
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
        return result ? [{ type: ATTRIBUTE_OPTION }] : [];
      },
    }),
  }),
});

export const {
  useCreateAttributeOptionMutation,
  useGetAllAttributeOptionQuery,
  useGetAllVariantOptionsQuery,
  useGetAttributeOptionDetailsQuery,
  useUpdateAttributeOptionMutation,
  useDeleteAttributeOptionMutation,
} = attributeOption;
