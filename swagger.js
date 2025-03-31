const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NLP Feedback API',
    version: '1.0.0',
    description: 'API for processing user feedback and detecting surprise sentiment.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
