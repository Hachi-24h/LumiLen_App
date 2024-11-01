// getLocalIp.js
const os = require("os");

// Hàm lấy IP nội bộ của thiết bị
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (let interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];
    for (let i = 0; i < networkInterface.length; i++) {
      const alias = networkInterface[i];
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address; // Trả về IP nội bộ
      }
    }
  }
  return "localhost"; 
}

module.exports = getLocalIpAddress;
