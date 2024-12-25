"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controllers_1 = __importDefault(require("./admin.controllers"));
const admin_validations_1 = __importDefault(require("./admin.validations"));
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(admin_validations_1.default.LoginValidationSchema), admin_controllers_1.default.loginAdmin);
const adminRouters = router;
exports.default = adminRouters;
