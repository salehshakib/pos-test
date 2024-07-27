import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../utilities/configs/base_url";
import { logout } from "../services/auth/authSlice";
import { openNotification } from "../../utilities/lib/openToaster";

const baseQuery = fetchBaseQuery({
  baseUrl: `${base_url}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 408) {
    // Dispatch the logout action
    openNotification("failed", "Status 408 or 500");
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["department"],
  endpoints: () => ({}),
});
