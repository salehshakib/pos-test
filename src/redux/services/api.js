import { baseApi } from "../api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllData: build.query({
      query: ({ url, params }) => {
        return {
          url: `/${url}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, { url }) => {
        const tags = url?.split("/")[2];
        return [{ tags }];
      },
    }),
    getDetails: build.query({
      query: ({ url, id }) => {
        return {
          url: `/${url}/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, { url }) => {
        const tags = url?.split("/")[2];
        return [{ tags }];
      },
    }),
    // create: build.mutation({
    //   query: ({ url, data }) => {
    //     console.log(data);
    //     return {
    //       //   url: "/department/",
    //       //   method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    // update: build.mutation({
    //   query: ({ url, data }) => {
    //     console.log(data);
    //     return {
    //       //   url: "/department/",
    //       //   method: "PUT",
    //       body: data,
    //     };
    //   },
    // }),
    // delete: build.mutation({
    //   query: ({ url, data }) => {
    //     console.log(data);
    //     return {
    //       //   url: "/department/",
    //       //   method: "DELETE",
    //       body: data,
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetAllDataQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = api;
