import { baseApi } from "../../api/baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query({
      query: ({ url, params }) => {
        console.log(url, params);

        return {
          url: `/human-resource/department`,
          method: "GET",
          params,
        };
      },
    }),
    createDepartment: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          //   url: "/department/",
          //   method: "POST",
          body: data,
        };
      },
    }),
    updateDepartment: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          //   url: "/department/",
          //   method: "PUT",
          body: data,
        };
      },
    }),
    deleteDepartment: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          //   url: "/department/",
          //   method: "DELETE",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
