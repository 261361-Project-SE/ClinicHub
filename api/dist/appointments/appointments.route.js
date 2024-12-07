"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointments_controller_1 = require("./appointments.controller");
const router = express_1.default.Router();
router.get("/", appointments_controller_1.appointmentsController.getAllAppointment);
router.post("/create", appointments_controller_1.appointmentsController.createAppointment);
exports.default = router;
