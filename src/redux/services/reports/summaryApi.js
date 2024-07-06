// Import necessary dependencies
import { SUMMARY } from "../../../utilities/apiEndpoints/report.api";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const summaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReportSummary: build.query({
      query: () => ({
        url: `/${SUMMARY}`,
        method: "GET",
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: SUMMARY }, SUMMARY],
    }),
  }),
});

export const { useGetReportSummaryQuery } = summaryApi;
