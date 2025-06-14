import { Router } from 'express';
import { UserController } from '../infrastructure/controller/user.controller';

export class UserRoutes {
  private router: Router;
  private controller: UserController

  constructor(userController: UserController) {
    this.router = Router();
    this.controller = userController;
    this.router.put('/', this.controller.updateUser.bind(this.controller));
    this.router.post('/', this.controller.createRole.bind(this.controller));
    this.router.post('/update-password', this.controller.updatePassword.bind(this.controller));
    this.router.get('/', this.controller.getPaginated.bind(this.controller));
    this.router.get('/:id', this.controller.getById.bind(this.controller));
    this.router.delete('/:id', this.controller.softDelete.bind(this.controller));
  }

  public getRoutes(): Router {
    return this.router;
  }
}
