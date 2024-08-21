export const mode = import.meta.env.VITE_MODE;
export const isDev = import.meta.env.VITE_DEV_MODE;

const apiEndpoints = {
  local: import.meta.env.VITE_LOCAL_API_URL,
  production: import.meta.env.VITE_PRODUCTION_API_URL,
  // vistock: import.meta.env.VITE_VISTOCK_API_URL,
  // pms: import.meta.env.VITE_PMS_API_URL,
  // dhakatech: import.meta.env.VITE_DHAKATECH_API_URL,
  // vitaport: import.meta.env.VITE_VITAPORT_API_URL,
};

export const base_url = apiEndpoints[mode];
export const api_key = import.meta.env.VITE_SECRET_KEY;
