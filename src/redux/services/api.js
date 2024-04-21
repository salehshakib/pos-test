import { baseApi } from "../api/baseApi";

let tags = "";

const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllData: build.query({
      query: ({ url, params }) => {
        console.log(url);

        tags = url.split("/")[2];
        return {
          url: `/${url}`,
          method: "GET",
          params,
        };
      },
      providesTags: [tags],
    }),
    getDetails: build.query({
      query: ({ url, id }) => {
        return {
          url: `/${url}/${id}`,
          method: "GET",
        };
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
