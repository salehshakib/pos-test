import { BALANCE_WITHDRAWAL } from '../../../utilities/apiEndpoints/account.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const balanceWithdrawApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBalanceWithdraw: build.query({
      query: ({ params }) => {
        return {
          url: `/${BALANCE_WITHDRAWAL}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: BALANCE_WITHDRAWAL, ...params },
        BALANCE_WITHDRAWAL,
      ],
    }),

    getBalanceWithdrawDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${BALANCE_WITHDRAWAL}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [BALANCE_WITHDRAWAL],
    }),

    createBalanceWithdraw: build.mutation({
      query: ({ formData }) => {
        return {
          url: `/${BALANCE_WITHDRAWAL}/store`,
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
        return result ? [{ type: BALANCE_WITHDRAWAL }] : [];
      },
    }),

    updateBalanceWithdraw: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/${BALANCE_WITHDRAWAL}/update/${id}`,
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
        return result ? [{ type: BALANCE_WITHDRAWAL }] : [];
      },
    }),

    updateBalanceWithdrawStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${BALANCE_WITHDRAWAL}/status/${id}`,
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
        return result ? [{ type: BALANCE_WITHDRAWAL }] : [];
      },
    }),

    deleteBalanceWithdraw: build.mutation({
      query: (id) => {
        return {
          url: `/${BALANCE_WITHDRAWAL}/delete/${id}`,
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
        return result ? [{ type: BALANCE_WITHDRAWAL }] : [];
      },
    }),
  }),
});

export const {
  useCreateBalanceWithdrawMutation,
  useGetAllBalanceWithdrawQuery,
  useGetBalanceWithdrawDetailsQuery,
  useUpdateBalanceWithdrawMutation,
  useUpdateBalanceWithdrawStatusMutation,
  useDeleteBalanceWithdrawMutation,
} = balanceWithdrawApi;
