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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const admin_model_1 = require("./admin.model");
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check if the user is exist
    const admin = yield admin_model_1.Admin.findOne({ email }).select('+password');
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The admin is not found');
    }
    // check if the password is correct
    const isPasswordMatch = yield admin_model_1.Admin.isPasswordMatched(password, admin === null || admin === void 0 ? void 0 : admin.password);
    console.log({ isPasswordMatch });
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid credentials');
    }
    const jwtPayload = {
        id: admin === null || admin === void 0 ? void 0 : admin._id.toString(),
        email: admin === null || admin === void 0 ? void 0 : admin.email,
        role: 'admin'
    };
    const accessToken = (0, jwtHelpers_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_expiration);
    return accessToken;
});
const AdminServices = {
    loginAdmin
};
exports.default = AdminServices;
