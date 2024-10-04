import {
  BALANCE,
  PETTY_CASH,
  PETTYCASH_REQUEST,
} from '../../../utilities/apiEndpoints/account.api';
import { openNotification } from '../../../utilities/lib/openToaster';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const pettyCashRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPettyCashRequest: build.query({
      query: ({ params }) => {
        return {
          url: `/${PETTYCASH_REQUEST}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PETTYCASH_REQUEST, ...params },
        PETTYCASH_REQUEST,
      ],
    }),

    getPettyCashRequestDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${PETTYCASH_REQUEST}/show/${id}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [PETTYCASH_REQUEST],
    }),

    createPettyCashRequest: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${PETTYCASH_REQUEST}/store`,
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
        return result ? [{ type: PETTYCASH_REQUEST }] : [];
      },
    }),

    updatePettyCashRequestStatus: build.mutation({
      query: (payload) => {
        return {
          url: `/${PETTYCASH_REQUEST}/response/${payload.id}`,
          method: 'POST',
          body: payload,
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
        return result
          ? [
              { type: PETTYCASH_REQUEST },
              { type: BALANCE },
              { type: PETTY_CASH },
            ]
          : [];
      },
    }),

    deletePettyCashRequest: build.mutation({
      query: (id) => {
        return {
          url: `/${PETTYCASH_REQUEST}/delete/${id}`,
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
        return result ? [{ type: PETTYCASH_REQUEST }] : [];
      },
    }),
  }),
});

export const {
  useGetAllPettyCashRequestQuery,
  useGetPettyCashRequestDetailsQuery,
  useCreatePettyCashRequestMutation,
  useUpdatePettyCashRequestStatusMutation,
  useDeletePettyCashRequestMutation,
} = pettyCashRequestApi;
