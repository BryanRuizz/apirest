const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./v1/routes/*.js"], // Ruta a tus archivos de documentación
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app, port) => {
  app.use(
    "/api/v1/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs, {
      customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
    })
  );

  console.log(`Swagger UI is available at http://localhost:${port}/api/v1/docs`);
};

module.exports = { setupSwagger };
