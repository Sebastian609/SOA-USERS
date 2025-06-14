import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketRoutes } from "./routes/socket.routes";
import { SocketController } from "./infrastructure/controller/socket.controller";
import { SocketService } from "./service/socket.service";
import { RolesRoutes } from "./routes/roles.routes";
import { RoleController } from "./infrastructure/controller/roles.controller";
import { UserController } from "./infrastructure/controller/user.controller";
import { UserRoutes } from "./routes/user.routes";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/users.repository";
import { User } from "./infrastructure/entity/users.entity";
import { AppDataSource } from "./infrastructure/database/database";

const PORT = 2221;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const socketService = new SocketService(io);
const socketController = new SocketController(io);
const socketRoutes = new SocketRoutes(socketController);
const roleRoutes = new RolesRoutes(new RoleController());
const userRoutes = new UserRoutes(
  new UserController(
    new UserService(new UserRepository(AppDataSource.getRepository(User)))
  )
);

app.use(express.json());
app.use("/api", socketRoutes.getRoutes());
app.use("/api/roles", roleRoutes.getRoutes());
app.use("/api/users", userRoutes.getRoutes());
io.on("connection", (socket) => {
  socketService.handleConnection(socket);
});

httpServer.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
