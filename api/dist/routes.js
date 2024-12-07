"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointments_route_1 = __importDefault(require("./appointments/appointments.route"));
const swagger_route_1 = __importDefault(require("./swagger/swagger.route"));
const registerRoutes = (app) => {
    app.use("/appointment", appointments_route_1.default);
    app.use('/docs', swagger_route_1.default);
};
exports.default = registerRoutes;
