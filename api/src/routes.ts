import express from "express";
<<<<<<< Updated upstream
import appointmentRouter from "./appointments/appointments.route";
import swaggerRouter from "./swagger/swagger.route";

const registerRoutes = (app: express.Application) => {
  app.use("/appointment", appointmentRouter);
  app.use("/docs", swaggerRouter);
=======

import swaggerRouter from "./swagger/swagger.route"
import appointmentRouter from "./appointment/appointment.route";

const registerRoutes = (app: express.Application) => {
  app.use("/", appointmentRouter);
  app.use('/docs', swaggerRouter);
>>>>>>> Stashed changes
};

export default registerRoutes;
