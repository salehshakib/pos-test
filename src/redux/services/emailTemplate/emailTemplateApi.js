// Import necessary dependencies
import { EMAIL_TEMPLATE } from '../../../utilities/apiEndpoints/helper.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const emailTemplateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEmailTemplate: build.query({
      query: ({ params }) => ({
        url: `/${EMAIL_TEMPLATE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: EMAIL_TEMPLATE, ...params },
        EMAIL_TEMPLATE,
      ],
    }),

    getEmailTemplateDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${EMAIL_TEMPLATE}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: EMAIL_TEMPLATE, id }],
    }),

    createEmailTemplate: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${EMAIL_TEMPLATE}/store`,
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
        return result ? [{ type: EMAIL_TEMPLATE }] : [];
      },
    }),

    updateEmailTemplate: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${EMAIL_TEMPLATE}/update/${id}`,
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
        return result ? [{ type: EMAIL_TEMPLATE }] : [];
      },
    }),

    updateEmailTemplateStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${EMAIL_TEMPLATE}/status/${id}`,
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
        return result ? [{ type: EMAIL_TEMPLATE }] : [];
      },
    }),

    deleteEmailTemplate: build.mutation({
      query: (id) => {
        return {
          url: `/${EMAIL_TEMPLATE}/delete/${id}`,
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
        return result ? [{ type: EMAIL_TEMPLATE }] : [];
      },
    }),
  }),
});

export const {
  useGetAllEmailTemplateQuery,
  useGetEmailTemplateDetailsQuery,
  useCreateEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useUpdateEmailTemplateStatusMutation,
  useDeleteEmailTemplateMutation,
} = emailTemplateApi;
