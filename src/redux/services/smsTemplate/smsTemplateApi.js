// Import necessary dependencies
import { SMS_TEMPLATE } from '../../../utilities/apiEndpoints/helper.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const smsTemplateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSmsTemplate: build.query({
      query: ({ params }) => ({
        url: `/${SMS_TEMPLATE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: SMS_TEMPLATE, ...params },
        SMS_TEMPLATE,
      ],
    }),

    getSmsTemplateDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${SMS_TEMPLATE}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: SMS_TEMPLATE, id }],
    }),

    createSmsTemplate: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${SMS_TEMPLATE}/store`,
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
        return result ? [{ type: SMS_TEMPLATE }] : [];
      },
    }),

    updateSmsTemplate: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${SMS_TEMPLATE}/update/${id}`,
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
        return result ? [{ type: SMS_TEMPLATE }] : [];
      },
    }),

    updateSmsTemplateStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${SMS_TEMPLATE}/status/${id}`,
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
        return result ? [{ type: SMS_TEMPLATE }] : [];
      },
    }),

    deleteSmsTemplate: build.mutation({
      query: (id) => {
        return {
          url: `/${SMS_TEMPLATE}/delete/${id}`,
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
        return result ? [{ type: SMS_TEMPLATE }] : [];
      },
    }),
  }),
});

export const {
  useGetAllSmsTemplateQuery,
  useGetSmsTemplateDetailsQuery,
  useCreateSmsTemplateMutation,
  useUpdateSmsTemplateMutation,
  useUpdateSmsTemplateStatusMutation,
  useDeleteSmsTemplateMutation,
} = smsTemplateApi;
