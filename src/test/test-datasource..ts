import { DataSource } from 'typeorm';
import { User } from '../infrastructure/entity/users.entity'; // Tus entidades
import { Role } from '../infrastructure/entity/roles.entity';

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [User, Role],
  logging: false,
});
