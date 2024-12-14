import express from "express";

import swaggerRouter from "./swagger/swagger.route"
import appointmentRouter from "./appointment/appointment.route";

const registerRoutes = (app: express.Application) => {
  app.use("/", appointmentRouter);
  app.use('/docs', swaggerRouter);
};

export default registerRoutes;
