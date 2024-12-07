import express, { Router } from "express";
import { appointmentsController } from "./appointments.controller";
const router: Router = express.Router();

router.get("/", appointmentsController.getAllAppointment);
router.post("/create", appointmentsController.createAppointment);

export default router;
