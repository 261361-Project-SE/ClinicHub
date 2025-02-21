import express from "express";

import swaggerRouter from "./swagger/swagger.route";
import appointmentRouter from "./appointment/appointment.route";
import calendarRouter from "./calendar/calendar_api";
import feedbackRoutes from "./feedback/feedback.route";

const registerRoutes = (app: express.Application) => {
  app.use("/", appointmentRouter);
  app.use("/docs", swaggerRouter);
  app.use("/calendar", calendarRouter);
  app.use("/feedback", feedbackRoutes);
};

export default registerRoutes;
