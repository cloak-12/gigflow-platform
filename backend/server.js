require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const socket = require("./socket");

connectDB();

const server = http.createServer(app);
const io = socket.init(server);

io.on("connection", socket => {
  console.log("Socket connected");
  socket.on("join", userId => socket.join(userId));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
