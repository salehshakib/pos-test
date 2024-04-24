/* eslint-disable no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { api_key } from "../configs/base_url";
import CryptoJS from "crypto-js";

const mode = "local";
const fakeData = {
  id: "1",
  image:
    "https://images.pexels.com/photos/2315712/pexels-photo-2315712.jpeg?auto=compress&cs=tinysrgb&w=600",
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St, Anytown USA",
  phone: "+1234567890",
  department: "HR",
  action: "Edit",
};

export const verifyToken = (token) => {
  // var jwt = require("jsonwebtoken");

  console.log(token);
  console.log(api_key);

  try {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(fakeData),
      api_key
    ).toString();
    console.log(data);

    const bytes = CryptoJS.AES.decrypt(data.toString(), api_key);

    console.log(bytes);
    const decodedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decodedData);

    // console.log(JSON.parse(data));
  } catch (error) {
    console.error("Error decrypting token:", error);
  }

  // try {
  //   const bytes = CryptoJS.AES.decrypt(token, api_key);
  //   console.log("Decrypted bytes:", bytes);

  //   const plainText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   console.log("Decrypted text:", plainText);

  //   // return plainText;
  // } catch (error) {
  //   console.error("Error decrypting token:", error);
  //   // throw error; // Handle decryption error appropriately
  // }

  return token;
  // if (mode === "local") {
  //   console.log(mode);
  // } else {
  //   return jwtDecode(token, api_key);
  // }
  // return jwtDecode(token);
};
