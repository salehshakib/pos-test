// getLocalIp.js
import { exec } from 'child_process';
import os from 'os';

// Get local network interfaces
const interfaces = os.networkInterfaces();
let localIp = 'localhost';

// Loop through interfaces to find a valid IPv4 address (non-internal)
for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIp = iface.address;
      break;
    }
  }
}

// Start the Vite dev server with the dynamically obtained IP address
const command = `vite --host ${localIp} --port 3000`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Vite: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Vite stderr: ${stderr}`);
    return;
  }
});
