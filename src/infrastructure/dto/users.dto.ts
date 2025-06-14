import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'first_lastname' })
  firstLastname: string;

  @IsString()
  @Expose({ name: 'second_lastname' })
  secondLastname: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'role_id' })
  roleId: number;
}


export class UpdateUserDto {

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'first_lastname' })
  firstLastname: string;

  @IsString()
  @Expose({ name: 'second_lastname' })
  secondLastname: string;

  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'role_id' })
  roleId: number;
}