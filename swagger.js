const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/config/swagger_output.json";
const endpointsFiles = ["./src/routes.ts"];

swaggerAutogen(outputFile, endpointsFiles);
