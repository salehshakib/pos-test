import {
  GENERAL_SETTING,
  POS_SETTING,
} from '../../../../utilities/apiEndpoints/settings.api';
import { openNotification } from '../../../../utilities/lib/openToaster';
import { verifyToken } from '../../../../utilities/lib/verifyToken';
import { baseApi } from '../../../api/baseApi';

const generalSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGeneralSettings: build.query({
      query: (params) => {
        return {
          url: `/${GENERAL_SETTING}/show/1`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: GENERAL_SETTING }, GENERAL_SETTING],
    }),

    getPosSettings: build.query({
      query: (params) => {
        return {
          url: `/${POS_SETTING}/show/1`,
          method: 'GET',
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: POS_SETTING }, POS_SETTING],
    }),

    updateGeneralSettings: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${GENERAL_SETTING}/update/1`,
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
        return result ? [GENERAL_SETTING] : [];
      },
    }),

    updatePosSettings: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${POS_SETTING}/update/${id}`,
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
        return result ? [GENERAL_SETTING] : [];
      },
    }),
  }),
});

export const {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useUpdatePosSettingsMutation,
  useGetPosSettingsQuery,
} = generalSettingsApi;
