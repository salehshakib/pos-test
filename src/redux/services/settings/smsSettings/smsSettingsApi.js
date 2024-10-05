// Import necessary dependencies
import { SMS_SETTING } from '../../../../utilities/apiEndpoints/settings.api';
import { openNotification } from '../../../../utilities/lib/openToaster';
import { verifyToken } from '../../../../utilities/lib/verifyToken';
import { baseApi } from '../../../api/baseApi';

const smsSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSmsSettings: build.query({
      query: () => ({
        url: `/${SMS_SETTING}/show/1`,
        method: 'GET',
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: SMS_SETTING }, SMS_SETTING],
    }),

    updateSmsSettings: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${SMS_SETTING}/update/1`,
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
        return result ? [SMS_SETTING] : [];
      },
    }),
  }),
});

export const { useGetAllSmsSettingsQuery, useUpdateSmsSettingsMutation } =
  smsSettingsApi;
