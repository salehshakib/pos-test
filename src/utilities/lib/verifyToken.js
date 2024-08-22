import { mode } from '../configs/base_url';

export const verifyToken = (token) => {
  if (mode !== 'local') {
    try {
      // const decodedData = jwtDecode(token);

      // return decodedData?.data;
      return token;
    } catch (error) {
      console.error('Error decrypting token:', error);
    }
  } else {
    return token;
  }
};
