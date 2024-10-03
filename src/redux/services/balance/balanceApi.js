import {
  BALANCE,
  BALANCE_DEPOSIT,
  BALANCE_WITHDRAWAL,
  PETTY_CASH,
} from '../../../utilities/apiEndpoints/account.api';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const balanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBalance: build.query({
      query: ({ params }) => {
        return {
          url: `/${BALANCE}`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: BALANCE, ...params },
        { type: BALANCE_WITHDRAWAL, ...params },
        { type: BALANCE_DEPOSIT, ...params },
        { type: PETTY_CASH, ...params },
        { type: PETTY_CASH, ...params },
        BALANCE,
        BALANCE_WITHDRAWAL,
        BALANCE_DEPOSIT,
        PETTY_CASH,
      ],
    }),
  }),
});

export const { useGetAllBalanceQuery } = balanceApi;
