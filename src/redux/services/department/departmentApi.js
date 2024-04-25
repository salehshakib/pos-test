import { DEPARTMENT } from "../../../utilities/configs/Api";
import { openNotification } from "../../../utilities/lib/notification";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query({
      query: ({ params }) => {
        return {
          url: `/${DEPARTMENT}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: DEPARTMENT, params },
        DEPARTMENT,
      ],
    }),
    getDepartmentDetails: build.query({
      query: ({ id }) => {
        return {
          url: `${DEPARTMENT}/show/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: [DEPARTMENT],
    }),
    createDepartment: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${DEPARTMENT}/store`,
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
        return result ? [DEPARTMENT] : [];
      },
    }),
    updateDepartment: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${DEPARTMENT}/update/${data?.id}`,
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
        return result ? [DEPARTMENT] : [];
      },
    }),
    updateStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${DEPARTMENT}/status/${id}`,
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
        return result ? [DEPARTMENT] : [];
      },
    }),
    deleteDepartment: build.mutation({
      query: (id) => {
        return {
          url: `/${DEPARTMENT}/delete/${id}`,
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
        return result ? [DEPARTMENT] : [];
      },
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentDetailsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useUpdateStatusMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
