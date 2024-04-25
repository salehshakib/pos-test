import { notification } from "antd";
import { DEPARTMENT } from "../../../utilities/configs/Api";
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
      providesTags: [DEPARTMENT],
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
          notification?.success({
            message: "Success",
            description:
              response?.message ??
              "No Message is provided. Task Completed Successfully",
          });
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
          notification?.success({
            message: "Success",
            description:
              response?.message ??
              "No Message is provided. Task Completed Successfully",
          });

          return response;
        }
      },
      invalidatesTags: (result) => {
        return result ? [DEPARTMENT] : [];
      },
    }),
    updateDepartmentStatus: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${DEPARTMENT}/status/${data?.id}`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => {
        if (response?.success) {
          notification?.success({
            message: "Success",
            description:
              response?.message ??
              "No Message is provided. Task Completed Successfully",
          });

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
  useUpdateDepartmentStatusMutation,
} = departmentApi;
