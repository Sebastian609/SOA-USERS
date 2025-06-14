// src/dto/role.dto.ts
export class CreateRoleDto {
  name: string;
  description?: string;
  isActive?: boolean;
  permissions?: string[];
}

export class UpdateRoleDto {
  name?: string;
  description?: string;
  isActive?: boolean;
  permissions?: string[];
}