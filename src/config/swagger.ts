import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv';
dotenv.config();

import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación API SOA",
      version: "1.0.0",
    },
    components: {
      schemas: {
         UserLoginDto: {
          type: "object",
          required: ["email", "password"],
          properties: {

            email: { type: "string", example: "juan@example.com" },
            password: { type: "string", example: "123456" },
    
          },
        },
        CreateUserDto: {
          type: "object",
          required: ["name", "lastname", "email", "password", "rolId"],
          properties: {
            name: { type: "string", example: "Juan" },
            lastname: { type: "string", example: "Pérez" },
            email: { type: "string", example: "juan@example.com" },
            password: { type: "string", example: "123456" },
            documentNumber: { type: "string", example: "76228414" },
            rolId: { type: "integer", example: 2 },
          },
        },
        UpdateUserDto: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Juan Actualizado" },
            lastname: { type: "string", example: "Pérez" },
            email: { type: "string", example: "juan_new@example.com" },
            rolId: { type: "integer", example: 3 },
          },
        },
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            id: { type: "integer", example: 1 },
            username: { type: "string", example: "sebastian" },
            email: { type: "string", example: "sebastian@example.com" },
            password: { type: "string", example: "123456" },
            rolId: { type: "integer", example: 2 },
            isActive: { type: "boolean", example: true },
          },
        },
      },
    },
    servers: [
      {
         url: process.env.SWAGGER_SERVER_URL || 'http://localhost:2221/api',
      },
    ],
  },
  apis: ["src/routes/*.ts"], // debe apuntar a donde están tus rutas
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
