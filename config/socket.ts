import { Server, Socket } from "socket.io";
import { Server as HTTP } from "http";

const createSocket = (server: HTTP) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["admin-requests-only-lalala"],
      credentials: true,
    },
  });

  const onConnection = (socket: Socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
  };

  io.on("connection", onConnection);

  return io;
};

export default createSocket;
