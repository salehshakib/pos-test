import { jwtDecode } from "jwt-decode";
import { api_key } from "../configs/base_url";

export const verifyToken = (token) => {
  const mode = "local";

  if (mode === "local") {
    return token;
  } else {
    return jwtDecode(token, api_key);
  }
  // return jwtDecode(token);
};
