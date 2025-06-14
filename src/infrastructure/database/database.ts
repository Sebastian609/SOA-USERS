// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { Role } from '../entity/roles.entity';
import { User } from '../entity/users.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'frialux',
  synchronize: true,
  logging: true,
  entities: [Role, User], // Agrega todas tus entidades aquí
  migrations: [],
  subscribers: [],
});

// Inicializar la conexión
AppDataSource.initialize()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch(error => console.log('Error de conexión:', error));