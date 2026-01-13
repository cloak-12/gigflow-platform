let io;

const init = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  init,
  getIO
};
