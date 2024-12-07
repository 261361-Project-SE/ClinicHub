import express from "express";
import appointmentRouter from "./appointments/appointments.route";
import swaggerRouter from "./swagger/swagger.route"

const registerRoutes = (app: express.Application) => {
  app.use("/appointment", appointmentRouter);
  app.use('/docs', swaggerRouter);
};
export default registerRoutes;
