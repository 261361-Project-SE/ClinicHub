"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentsController = void 0;
const appointments_service_1 = require("./appointments.service");
class AppointmentsController {
    constructor() { }
    getAllAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield appointments_service_1.appointmentService.getRecord();
                res.status(200).send(result);
            }
            catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).send("Internal Server Error whiel get all appointment");
            }
        });
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield appointments_service_1.appointmentService.createAppointment(req.body);
                res.status(200).send(result);
            }
            catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).send("Internal Server Error while create appointment");
            }
        });
    }
}
exports.appointmentsController = new AppointmentsController();
