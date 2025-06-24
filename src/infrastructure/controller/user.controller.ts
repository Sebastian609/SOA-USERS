// src/controllers/role.controller.ts
import { Request, Response } from "express";
import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";
import { UserService } from "../../service/user.service";
import { plainToInstance } from "class-transformer";

export class UserController {
  private readonly userService: UserService;

  constructor(service: UserService) {
    this.userService = service;
  }

  

  async softDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = id as unknown as number;

      const user = await this.userService.softDelete(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const id = req.body.id as unknown as number;
      const password = req.body.password as unknown as string;
      const response = await this.userService.updatePassword(id, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) { 
    try {
      const loginData = plainToInstance(CreateUserDto, req.body, {
        excludeExtraneousValues: true
      });
    
      if (!loginData.email || !loginData.password) {
        throw new Error("Email and password are required");
      }

      const user = await  this.userService.login(loginData.email, loginData.password );

      return res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = id as unknown as number;

      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPaginated(req: Request, res: Response) {
    try {
      const { page, items } = req.query;
      console.log(req.query);

      const parsedPage = Number(page) - 1;
      const parsedItems = Number(items);

      if (parsedPage < 0) {
        throw new Error("Wrong data");
      }

      const result = await this.userService.getPaginated(
        parsedPage,
        parsedItems
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createRole(req: Request, res: Response) {
    try {
      const data: CreateUserDto = req.body;
      const newUser = await this.userService.createUser(data);
      res.status(201).json(newUser);
    } catch (error) {
      if (error.message.includes("already exists")) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const data = plainToInstance(UpdateUserDto, req.body, {
        excludeExtraneousValues: true 
      });
      const newUser = await this.userService.update(data);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
