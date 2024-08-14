// Import necessary dependencies
import {
  PERMISSION,
  ROLE_PERMISSION,
  SET_PERMISSION,
} from "../../../utilities/apiEndpoints/auth.api";
import { openNotification } from "../../../utilities/lib/openToaster";
import { verifyToken } from "../../../utilities/lib/verifyToken";
import { baseApi } from "../../api/baseApi";

const rolePermissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPermission: build.query({
      query: () => ({
        url: `/${PERMISSION}`,
        method: "GET",
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: () => [{ type: PERMISSION }, PERMISSION],
    }),

    getUserRolePermission: build.query({
      query: ({ params }) => ({
        url: `/${ROLE_PERMISSION}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { params }) => [
        { type: ROLE_PERMISSION, ...params },
        ROLE_PERMISSION,
      ],
    }),

    getRolePermissionDetails: build.query({
      query: ({ params }) => {
        return {
          url: `${ROLE_PERMISSION}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => verifyToken(response.data),
      providesTags: (result, error, { id }) => [{ type: ROLE_PERMISSION, id }],
    }),

    createRolePermission: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${ROLE_PERMISSION}/store`,
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
        return result ? [{ type: ROLE_PERMISSION }] : [];
      },
    }),

    updateRolePermission: build.mutation({
      query: ({ data }) => {
        return {
          url: `/${SET_PERMISSION}`,
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
        return result ? [{ type: ROLE_PERMISSION }] : [];
      },
    }),

    updateRolePermissionStatus: build.mutation({
      query: (id) => {
        return {
          url: `/${ROLE_PERMISSION}/status/${id}`,
          method: "POST",
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
        return result ? [{ type: ROLE_PERMISSION }] : [];
      },
    }),

    deleteRolePermission: build.mutation({
      query: (id) => {
        return {
          url: `/${ROLE_PERMISSION}/delete/${id}`,
          method: "DELETE",
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
        return result ? [{ type: ROLE_PERMISSION }] : [];
      },
    }),
  }),
});

export const {
  useGetAllPermissionQuery,
  useGetUserRolePermissionQuery,
  useGetRolePermissionDetailsQuery,
  useCreateRolePermissionMutation,
  useUpdateRolePermissionMutation,
  useUpdateRolePermissionStatusMutation,
  useDeleteRolePermissionMutation,
} = rolePermissionApi;
