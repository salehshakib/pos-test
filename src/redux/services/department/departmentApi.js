import { baseApi } from "../../api/baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query({
      query: (params) => {
        console.log(params);
        return {
          url: "/department/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;
