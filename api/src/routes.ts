import express from "express";

import swaggerRouter from "./swagger/swagger.route"
import appointmentRouter from "./appointment/appointment.route";
import calendarRouter from "./calendar/calendar_api";

const registerRoutes = (app: express.Application) => {
  app.use("/", appointmentRouter);
  app.use('/docs', swaggerRouter);
  app.use('/calendar', calendarRouter);

};

export default registerRoutes;
