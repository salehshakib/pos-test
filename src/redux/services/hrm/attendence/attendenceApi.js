// Import necessary dependencies
import { ATTENDENCE } from "../../../../utilities/apiEndpoints/hrm.api";
import { openNotification } from "../../../utilities/lib/openToaster";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const attendenceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAttendence: build.query({
      query: ({ params }) => ({
        url: `/${ATTENDENCE}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ATTENDENCE, params },
        ATTENDENCE,
      ],
    }),

    getAttendenceDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${ATTENDENCE}/show/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: ATTENDENCE, id }],
    }),

    createAttendence: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ATTENDENCE}/store`,
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
      transformErrorResponse: (response) => {
        if (response?.data?.success === false) {
          openNotification("error", response?.data?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [ATTENDENCE] : [];
      },
    }),

    updateAttendence: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${ATTENDENCE}/update/${id}`,
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
        return result ? [ATTENDENCE] : [];
      },
    }),

    updateAttendenceStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${ATTENDENCE}/status/${id}`,
          method: "POST",
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [ATTENDENCE] : [];
      },
    }),

    deleteAttendence: build.mutation({
      query: (id) => {
        return {
          url: `/${ATTENDENCE}/delete/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [ATTENDENCE] : [];
      },
    }),

    exportAttendence: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ATTENDENCE}/export`,
          method: "GET",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          openNotification("success", response?.message);
          return response;
        }
      },
    }),
  }),
});

export const {
  useGetAllAttendenceQuery,
  useGetAttendenceDetailsQuery,
  useCreateAttendenceMutation,
  useUpdateAttendenceMutation,
  useUpdateAttendenceStatusMutation,
  useDeleteAttendenceMutation,
  useExportAttendenceMutation,
} = attendenceApi;
