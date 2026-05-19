import { Router } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Mi Proyecto",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/modules/**/*.swagger.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerCore = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      explorer: true,
      docExpansion: "list",
      defaultModelsExpandDepth: -1,
      displayRequestDuration: false,
      filter: true,
      showExtensions: false,
      tryItOutEnabled: true,
    },
  }),
];

const router = Router();

router.use("/api-docs", ...swaggerCore);

export const swaggerConfig = router;
