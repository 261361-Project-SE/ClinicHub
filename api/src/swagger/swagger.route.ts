import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const swaggerRouter = express.Router();

const swaggerDocument = path.resolve("swagger.json");

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(require(swaggerDocument)));

export default swaggerRouter;
