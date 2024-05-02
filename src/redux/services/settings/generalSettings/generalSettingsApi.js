import { GENERAL_SETTINGS } from "../../../../utilities/configs/Api";
import { openNotification } from "../../../../utilities/lib/notification";
import { verifyToken } from "../../../../utilities/lib/verifyToken";
import { baseApi } from "../../../api/baseApi";

const generalSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGeneralSettings: build.query({
      query: () => {
        return {
          url: `/${GENERAL_SETTINGS}/show/1`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: GENERAL_SETTINGS }, GENERAL_SETTINGS],
    }),

    updateGeneralSettings: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${GENERAL_SETTINGS}/update/`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [GENERAL_SETTINGS] : [];
      },
    }),
  }),
});

export const { useGetGeneralSettingsQuery, useUpdateGeneralSettingsMutation } =
  generalSettingsApi;
