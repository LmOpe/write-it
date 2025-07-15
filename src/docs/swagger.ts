import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WriteIt API",
      version: "1.0.0",
      description: "API documentation for WriteIt blogging application",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      }
    }
  },
  apis: ["./src/modules/**/*.docs.ts"], // Adjusted path to match the project structure
};

export const swaggerSpec = swaggerJsdoc(options);