"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const swaggerRouter = express_1.default.Router();
const swaggerDocument = path_1.default.resolve("swagger.json");
swaggerRouter.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(require(swaggerDocument)));
exports.default = swaggerRouter;
