import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/users.repository";
import { hashPassword } from "../utils/bcrip.util";
import { CreateUserDto } from "../infrastructure/dto/users.dto";
import { User } from "../infrastructure/entity/users.entity";
import { plainToInstance } from "class-transformer";

jest.mock("../utils/bcrip.util", () => ({
  hashPassword: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
  
    userRepositoryMock = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    
    } as unknown as jest.Mocked<UserRepository>;

  
    userService = new UserService(userRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("createUser", () => {
    it("debería crear un usuario si no existe el username", async () => {
      const userDto: CreateUserDto = {
        username: "testuser",
        password: "password123",
        name: "Test User",
        firstLastname: "Test",
        secondLastname: "Test",
        roleId: 1,
      };

      const createdUser = plainToInstance(User, userDto);
      const hashedPassword = "hashed_password";

      userRepositoryMock.findByUsername.mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
      userRepositoryMock.create.mockResolvedValue(createdUser);

      const result = await userService.createUser(userDto);

      expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith(userDto.username);
      expect(hashPassword).toHaveBeenCalledWith(userDto.password);
      expect(userRepositoryMock.create).toHaveBeenCalled();
      expect(result).toEqual(createdUser);
    });

    it("debería lanzar error si el username ya existe", async () => {
      const userDto: CreateUserDto = {
        username: "existinguser",
        password: "password123",
        name: "Existing User",
        firstLastname: "test",
        secondLastname: "test",
        roleId: 1,
      };

      userRepositoryMock.findByUsername.mockResolvedValue({ id: 99 } as User);

      await expect(userService.createUser(userDto)).rejects.toThrow(
        `Username with ${userDto.username} allready exists.`
      );

      expect(userRepositoryMock.findByUsername).toHaveBeenCalledWith(userDto.username);
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });
  });
});
