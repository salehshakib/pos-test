// Import necessary dependencies
import { EMAIL_SETTING } from "../../../../utilities/apiEndpoints/settings.api";
import { openNotification } from "../../../../utilities/lib/openToaster";
import { verifyToken } from "../../../../utilities/lib/verifyToken";
import { baseApi } from "../../../api/baseApi";

const emailSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEmailSettings: build.query({
      query: ({ params }) => ({
        url: `/${EMAIL_SETTING}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: EMAIL_SETTING, params },
        EMAIL_SETTING,
      ],
    }),

    updateEmailSettings: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${EMAIL_SETTING}/update/${id}`,
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
        return result ? [EMAIL_SETTING] : [];
      },
    }),
  }),
});

export const { useGetAllEmailSettingsQuery, useUpdateEmailSettingsMutation } =
  emailSettingsApi;
