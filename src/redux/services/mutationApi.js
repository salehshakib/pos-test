import { notification } from "antd";
import { baseApi } from "../api/baseApi";

const mutationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    storeData: build.mutation({
      query: ({ url, data }) => {
        return {
          url: `/${url}/store`,
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
      invalidatesTags: (result, error, { url }) => {
        const tags = url?.split("/")[2];
        return [{ tags }];
      },
    }),
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

export const { useStoreDataMutation } = mutationApi;
