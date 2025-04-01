const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/github.routes.js']; // Caminho para seus arquivos de rota

const doc = {
    info: {
        version: "1.0.0",
        title: "GitHub Repositories API",
        description: "API para buscar e gerenciar repositórios do GitHub",
    },
    host: "localhost:3000",
    basePath: "/api/github",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "GitHub",
            description: "Operações relacionadas a repositórios do GitHub"
        }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }
    },
};

swaggerAutogen(outputFile, endpointsFiles, doc);