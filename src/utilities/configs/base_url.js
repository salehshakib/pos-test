export const mode = import.meta.env.VITE_MODE;
export const isDev = import.meta.env.VITE_DEV_MODE;

const apiEndpoints = {
  local: import.meta.env.VITE_LOCAL_API_URL,
  production: import.meta.env.VITE_PRODUCTION_API_URL,
};

export const base_url = apiEndpoints[mode];
// export const base_url = 'https://dhakatech.vitasoftsolutions.com/api';
export const api_key = import.meta.env.VITE_SECRET_KEY;
