// Import necessary dependencies
import {
  NOTIFICATION,
  NOTIFICATION_READ,
} from '../../../utilities/apiEndpoints/helper.api';
import { verifyToken } from '../../../utilities/lib/verifyToken';
import { baseApi } from '../../api/baseApi';

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotification: build.query({
      query: ({ params }) => ({
        url: `/${NOTIFICATION}`,
        params: params,
        method: 'GET',
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [
        { type: NOTIFICATION, id },
        NOTIFICATION,
      ],
    }),
    readNotification: build.mutation({
      query: (data) => ({
        url: `/${NOTIFICATION_READ}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => {
        if (response?.success) {
          // openNotification("success", response?.message);
          return response;
        }
      },
      // transformResponse: (response) => verifyToken(response.data),

      // providesTags: (result, error, { id }) => [
      //   { type: NOTIFICATION_READ, id },
      //   NOTIFICATION_READ,
      // ],
      invalidatesTags: (result) => {
        return result ? [{ type: NOTIFICATION }] : [];
      },
    }),

    // getNotificationDetails: build.query({
    //   query: ({ id, params }) => {
    //     return {
    //       url: `${NOTIFICATION}/show/${id}`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response) => verifyToken(response.data),
    //   providesTags: (result, error, { id }) => [{ type: NOTIFICATION, id }],
    // }),

    // createNotification: build.mutation({
    //   query: ({ data }) => {
    //     return {
    //       url: `/${NOTIFICATION}/store`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // transformResponse: (response) => {
    //   if (response?.success) {
    //     openNotification("success", response?.message);
    //     return response;
    //   }
    // },
    //   transformErrorResponse: (response) => {
    //     if (response?.data?.success === false) {
    //       openNotification("error", response?.data?.message);
    //       return response;
    //     }
    //   },
    // invalidatesTags: (result) => {
    //   return result ? [{ type: NOTIFICATION }] : [];
    // },
    // }),

    // updateNotification: build.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/${NOTIFICATION}/update/${id}`,
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: NOTIFICATION }] : [];
    //   },
    // }),

    // updateNotificationStatus: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${NOTIFICATION}/status/${id}`,
    //       method: "POST",
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: NOTIFICATION }] : [];
    //   },
    // }),

    // deleteNotification: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/${NOTIFICATION}/delete/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   transformResponse: (response) => {
    //     if (response?.success) {
    //       openNotification("success", response?.message);
    //       return response;
    //     }
    //   },
    //   invalidatesTags: (result) => {
    //     return result ? [{ type: NOTIFICATION }] : [];
    //   },
    // }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useReadNotificationMutation,
  // useGetNotificationDetailsQuery,
  // useCreateNotificationMutation,
  // useUpdateNotificationMutation,
  // useUpdateNotificationStatusMutation,
  // useDeleteNotificationMutation,
} = notificationApi;
