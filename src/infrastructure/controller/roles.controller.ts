// src/controllers/role.controller.ts
import { Request, Response } from 'express';
import { RoleService } from '../../service/roles.service';
import { CreateRoleDto, UpdateRoleDto } from '../dto/roles.dto';

export class RoleController {
  private readonly roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  /**
   * Get all roles
   */
  async getAllRoles(req: Request, res: Response) {
    try {
      const activeOnly = req.query.active === 'true';
      const roles = activeOnly 
        ? await this.roleService.getActiveRoles()
        : await this.roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get role by ID
   */
  async getRoleById(req: Request, res: Response) {
    try {
      const role = await this.roleService.getRoleById(Number(req.params.id));
      res.json(role);
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Create new role
   */
  async createRole(req: Request, res: Response) {
    try {
      const roleData: CreateRoleDto = req.body;
      const newRole = await this.roleService.createRole(roleData);
      res.status(201).json(newRole);
    } catch (error) {
      if (error.message.includes('already exists')) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  /**
   * Update role
   */
  async updateRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updateData: UpdateRoleDto = req.body;
      const updatedRole = await this.roleService.updateRole(id, updateData);
      res.json(updatedRole);
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
      } else if (error.message.includes('already exists')) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  /**
   * Delete role
   */
  async deleteRole(req: Request, res: Response) {
    try {
      await this.roleService.deleteRole(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Deactivate role (soft delete)
   */
  async deactivateRole(req: Request, res: Response) {
    try {
      await this.roleService.deactivateRole(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Activate role
   */
  async activateRole(req: Request, res: Response) {
    try {
      await this.roleService.activateRole(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error.message.includes('not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
}