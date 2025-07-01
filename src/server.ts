import express from "express";
import { createServer } from "http";
import { RolesRoutes } from "./routes/roles.routes";
import { RoleController } from "./infrastructure/controller/roles.controller";
import { UserController } from "./infrastructure/controller/user.controller";
import { UserRoutes } from "./routes/user.routes";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/users.repository";
import { User } from "./infrastructure/entity/users.entity";
import { AppDataSource } from "./infrastructure/database/database";
import { setupSwagger } from "./config/swagger";

const PORT = 2221;
const app = express();
const httpServer = createServer(app);
setupSwagger(app);

const roleRoutes = new RolesRoutes(new RoleController());
const userRoutes = new UserRoutes(
  new UserController(
    new UserService(new UserRepository(AppDataSource.getRepository(User)))
  )
);

app.use(express.json());

app.use("/api/users/roles", roleRoutes.getRoutes());
app.use("/api/users", userRoutes.getRoutes());

httpServer.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
