import e from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSchema from '../api-docs/openapi.json';

const swaggerMiddleware = (() => {
  function setup(app: e.Application) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  }

  return {
    setup,
  };
})();

export default swaggerMiddleware;
