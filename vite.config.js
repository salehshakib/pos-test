import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { getLocalIp } from './getLocalIp'; // Import your helper

// Get the local IP synchronously
const localIp = getLocalIp();

// Check if we should use the local IP or default to localhost
const useLocalIp = process.env.USE_LOCAL_IP === 'true';

export default defineConfig({
  plugins: [react()],
  server: {
    host: useLocalIp ? localIp : 'localhost', // Use local IP if the environment variable is set
    port: 3000, // Optional: set your port here
  },
});
