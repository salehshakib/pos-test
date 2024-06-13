// Import necessary dependencies
import { EMPLOYEE } from "../../../../utilities/apiEndpoints/hrm.api";
import { openNotification } from "../../../utilities/lib/openToaster";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const employee = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEntity: build.query({
      query: ({ params }) => ({
        url: `/${EMPLOYEE}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: EMPLOYEE, params },
        EMPLOYEE,
      ],
    }),

    getEntityDetails: build.query({
      query: ({ id, params }) => {
        return {
          url: `${EMPLOYEE}/show/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: EMPLOYEE, id }],
    }),

    createEntity: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${EMPLOYEE}/store`,
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
        return result ? [EMPLOYEE] : [];
      },
    }),

    updateEntity: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/${EMPLOYEE}/update/${id}`,
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
        return result ? [EMPLOYEE] : [];
      },
    }),

    updateEntityStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${EMPLOYEE}/status/${id}`,
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
        return result ? [EMPLOYEE] : [];
      },
    }),

    deleteEntity: build.mutation({
      query: (id) => {
        return {
          url: `/${EMPLOYEE}/delete/${id}`,
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
        return result ? [EMPLOYEE] : [];
      },
    }),

    exportEntity: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${EMPLOYEE}/export`,
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
  useGetAllEntityQuery,
  useGetEntityDetailsQuery,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useUpdateEntityStatusMutation,
  useDeleteEntityMutation,
  useExportEntityMutation,
} = employee;
