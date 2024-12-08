import express from "express";
import appointmentRouter from "./appointments/appointments.route";
import swaggerRouter from "./swagger/swagger.route"
import bookingRouter from "./Booking/booking.route";

const registerRoutes = (app: express.Application) => {
  app.use("/appointment", appointmentRouter);
  app.use('/docs', swaggerRouter);
  app.use("/Booking",bookingRouter)
};
export default registerRoutes;
