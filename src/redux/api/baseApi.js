import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../utilities/configs/base_api";

// main api for the website
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url}`,
    credentials: "include",
  }),
  tagTypes: ["test"],
  endpoints: () => ({}),
});
