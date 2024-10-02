import { BALANCE_DEPOSIT } from '../../../utilities/apiEndpoints/account.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const balanceDepositApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBalanceDeposit: build.query({
      query: ({ params }) => {
        return {
          url: `/${BALANCE_DEPOSIT}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: BALANCE_DEPOSIT, ...params },
        BALANCE_DEPOSIT,
      ],
    }),

    getBalanceDepositDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${BALANCE_DEPOSIT}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [BALANCE_DEPOSIT],
    }),

    createBalanceDeposit: build.mutation({
      query: ({ formData }) => {
        return {
          url: `/${BALANCE_DEPOSIT}/store`,
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
        return result ? [{ type: BALANCE_DEPOSIT }] : [];
      },
    }),

    updateBalanceDeposit: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/${BALANCE_DEPOSIT}/update/${id}`,
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
        return result ? [{ type: BALANCE_DEPOSIT }] : [];
      },
    }),

    updateBalanceDepositStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${BALANCE_DEPOSIT}/status/${id}`,
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
        return result ? [{ type: BALANCE_DEPOSIT }] : [];
      },
    }),

    deleteBalanceDeposit: build.mutation({
      query: (id) => {
        return {
          url: `/${BALANCE_DEPOSIT}/delete/${id}`,
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
        return result ? [{ type: BALANCE_DEPOSIT }] : [];
      },
    }),
  }),
});

export const {
  useCreateBalanceDepositMutation,
  useGetAllBalanceDepositQuery,
  useGetBalanceDepositDetailsQuery,
  useUpdateBalanceDepositMutation,
  useUpdateBalanceDepositStatusMutation,
  useDeleteBalanceDepositMutation,
} = balanceDepositApi;
