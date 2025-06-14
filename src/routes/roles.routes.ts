// src/routes/role.routes.ts
import express from "express";
import { Router } from "express";
import { RoleController } from "../infrastructure/controller/roles.controller";


const router = express.Router();
const roleController = new RoleController();

export class RolesRoutes {
  private router: Router;
  private controller: RoleController;

  constructor(controller: RoleController) {
    this.router = Router();
    this.controller = controller;

    this.router.get("/", controller.getAllRoles.bind(this.controller));
    this.router.get("/:id", controller.getRoleById.bind(this.controller));
    this.router.post("/", controller.createRole.bind(this.controller));
    this.router.put("/:id", controller.updateRole.bind(this.controller));
    this.router.delete("/:id", controller.deleteRole.bind(this.controller));
    this.router.post(
      "/:id/deactivate",
      roleController.deactivateRole.bind(roleController)
    );
    this.router.post(
      "/:id/activate",
      roleController.activateRole.bind(roleController)
    ); // Ruta para enviar un mensaje
  }

  public getRoutes(): Router {
    return this.router;
  }
}
