"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const system_controllers_1 = __importDefault(require("./system.controllers"));
const router = express_1.default.Router();
router.get('/dashboard', (0, adminAuth_1.default)(), system_controllers_1.default.getDashboardStates);
router.delete('/image/:publicId', (0, adminAuth_1.default)(), system_controllers_1.default.deleteImage);
const SystemRoutes = router;
exports.default = SystemRoutes;
