// Set up a global variable to store the Socket.IO instance
let socketInstance;
let authToken;
let ioInstance;
// Function to set the Socket.IO instance
const setIoInstance = (io) => {
  ioInstance = io;
};
const getIoInstance = () => {
  return ioInstance;
};
const setSocketInstance = (socket) => {
  socketInstance = socket;
};
const setAuthToken = (token) => {
  authToken = token;
};
const getAuthToken = () => {
  return authToken;
};
const getSocketInstance = () => {
  return socketInstance;
};
module.exports = {
  setIoInstance,
  getIoInstance,
  setSocketInstance,
  getSocketInstance,
  setAuthToken,
  getAuthToken,
};
