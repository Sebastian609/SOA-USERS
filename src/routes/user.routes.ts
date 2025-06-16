import { Router } from "express";
import { UserController } from "../infrastructure/controller/user.controller";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
 */
export class UserRoutes {
  private router: Router;
  private controller: UserController;

  constructor(userController: UserController) {
    this.router = Router();
    this.controller = userController;

    /**
     * @swagger
     * /users:
     *   put:
     *     summary: Actualizar un usuario existente
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       201:
     *         description: Usuario actualizado correctamente
     *       400:
     *         description: Error en la solicitud
     */
    this.router.put("/", this.controller.updateUser.bind(this.controller));

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Crear un nuevo usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       201:
     *         description: Usuario creado correctamente
     *       400:
     *         description: Error de validación o de datos
     *       409:
     *         description: El usuario ya existe
     */
    this.router.post("/", this.controller.createRole.bind(this.controller));

    /**
     * @swagger
     * /users/update-password:
     *   post:
     *     summary: Actualizar la contraseña de un usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 example: 1
     *               password:
     *                 type: string
     *                 example: nuevaPassword123
     *     responses:
     *       200:
     *         description: Contraseña actualizada correctamente
     *       400:
     *         description: Error al actualizar la contraseña
     */
    this.router.post(
      "/update-password",
      this.controller.updatePassword.bind(this.controller)
    );

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtener lista paginada de usuarios
     *     tags: [Users]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Página a obtener
     *       - in: query
     *         name: items
     *         schema:
     *           type: integer
     *           example: 10
     *         description: Cantidad de usuarios por página
     *     responses:
     *       200:
     *         description: Lista paginada de usuarios
     *       400:
     *         description: Error en los parámetros
     */
    this.router.get("/", this.controller.getPaginated.bind(this.controller));

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Obtener usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       400:
     *         description: Usuario no encontrado o ID inválido
     */
    this.router.get("/:id", this.controller.getById.bind(this.controller));

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Eliminar un usuario por ID (soft delete)
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     responses:
     *       200:
     *         description: Usuario eliminado correctamente
     *       400:
     *         description: Error al eliminar el usuario
     */
    this.router.delete("/:id", this.controller.softDelete.bind(this.controller));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
