// src/services/User.service.ts
import { User } from "../infrastructure/entity/users.entity";
import { UserRepository } from "../repository/users.repository";
import { CreateUserDto, UpdateUserDto } from "../infrastructure/dto/users.dto";
import { comparePassword, hashPassword } from "../utils/bcrip.util";
import { plainToInstance } from "class-transformer";

export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  /**
   * Get all Users
   */
  async getAllUsers(): Promise<User[]> {
    return this.UserRepository.findAll();
  }

  /**
   * Get active Users only
   */
  async getActiveUsers(): Promise<User[]> {
    return this.UserRepository.findActiveUsers();
  }

  /**
   * Get User by ID
   * @param id User ID
   */
  async getUserById(id: number): Promise<User> {
    return this.UserRepository.findById(id);
  }

  /**
   * Get User by name
   * @param name User name
   */
  async getUserByName(name: string): Promise<User | null> {
    return this.UserRepository.findByName(name);
  }

  /**
   * Create a new User
   * @param UserData User data
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, userData);
    const userExists = await this.UserRepository.findByUsername(user.username);

    if (userExists) {
      throw new Error(`Username with ${userData.username} allready exists.`);
    }

    user.password = await hashPassword(userData.password);
    return this.UserRepository.create(user);
  }

  async update(userData: UpdateUserDto): Promise<User> {
    const user = plainToInstance(User, userData);
    const currentUser = await this.UserRepository.findById(userData.id);
    const usernameUsed = await this.UserRepository.findByUsername(
      user.username
    );

    if (user.username && usernameUsed && usernameUsed.id !== currentUser.id) {
      throw new Error(`Username "${userData.username}" is already in use.`);
    }

    return this.UserRepository.update(user.id, user);
  }

  async updatePassword(id: number, newPassword: string) {
    const user = await this.UserRepository.findById(id);
    if (await comparePassword(newPassword, user.password)) {
      throw new Error("The new and old passwords are the same.");
    }
    const hashedPassword = await hashPassword(newPassword);
    return await this.UserRepository.updatePassword(id, hashedPassword);
  }

  async softDelete(id: number) {
    const exists = await this.UserRepository.findById(id);

    if (!exists) {
      throw new Error("El usuario no existe");
    }
    return await this.UserRepository.softDelete(id);
  }

  async getPaginated(page: number, itemsPerPage: number) {
    const offset = page * itemsPerPage;
    const limit = itemsPerPage;

    const [items, totalCount] = await Promise.all([
      this.UserRepository.getPaginated(limit, offset),
      this.UserRepository.count({deleted: false}),
    ]);
    return {
      response: items,
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        hasNextPage: (page + 1) * itemsPerPage < totalCount,
        hasPreviousPage: page > 0,
      },
    };
  }
}
