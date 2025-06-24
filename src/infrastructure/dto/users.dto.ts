  import { Expose } from "class-transformer";
  import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Expose({ name: "lastname" })
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @Expose({ name: "email" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose({ name: "rol_id" })
    rolId: number;
  }

  export class LoginUserDto { 
    @IsNotEmpty()
    @IsString()
    @Expose()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string;
  }

  export class UpdateUserDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    id: number;

    @IsString()
    @Expose()
    @IsOptional()
    name?: string;

    @IsString()
    @Expose()
    @IsOptional()
    email?: string;

    @IsString()
    @Expose()
    @IsOptional()
    lastname?: string;

    @IsNumber()
    @IsOptional()
    @Expose({ name: "rol_id" })
    rolId?: number;
  }
