// Import necessary dependencies
import { PROFIT_LOSS } from '../../../utilities/apiEndpoints/report.api';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const profitLossReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfitLossReport: build.query({
      query: ({ params }) => ({
        url: `/${PROFIT_LOSS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: PROFIT_LOSS, ...params },
        PROFIT_LOSS,
      ],
    }),
  }),
});

export const { useGetProfitLossReportQuery } = profitLossReportApi;
