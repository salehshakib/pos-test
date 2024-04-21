import { baseApi } from "../api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllData: build.query({
      query: ({ url, params }) => {
        console.log(url, params);

        // return {
        //   //   url,
        //   params,
        // };

        return {
          url: `/human-resources/department/`,
          method: "GET",
          params,
        };
      },
    }),
    // getSingleData: build.query({

    // })
    create: build.mutation({
      query: ({ url, data }) => {
        console.log(data);
        return {
          //   url: "/department/",
          //   method: "POST",
          body: data,
        };
      },
    }),
    update: build.mutation({
      query: ({ url, data }) => {
        console.log(data);
        return {
          //   url: "/department/",
          //   method: "PUT",
          body: data,
        };
      },
    }),
    delete: build.mutation({
      query: ({ url, data }) => {
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
  useGetAllDataQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = api;
