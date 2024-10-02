import { ACCOUNT } from '../../../utilities/apiEndpoints/account.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAccount: build.query({
      query: ({ params }) => {
        return {
          url: `/${ACCOUNT}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ACCOUNT, ...params },
        ACCOUNT,
      ],
    }),

    getAccountDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${ACCOUNT}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [ACCOUNT],
    }),

    createAccount: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ACCOUNT}/store`,
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
        return result ? [{ type: ACCOUNT }] : [];
      },
    }),

    updateAccount: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${ACCOUNT}/update/${id}`,
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
        return result ? [{ type: ACCOUNT }] : [];
      },
    }),

    updateAccountStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${ACCOUNT}/status/${id}`,
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
        return result ? [{ type: ACCOUNT }] : [];
      },
    }),

    deleteAccount: build.mutation({
      query: (id) => {
        return {
          url: `/${ACCOUNT}/delete/${id}`,
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
        return result ? [{ type: ACCOUNT }] : [];
      },
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useGetAccountDetailsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useUpdateAccountStatusMutation,
  useDeleteAccountMutation,
} = accountApi;
