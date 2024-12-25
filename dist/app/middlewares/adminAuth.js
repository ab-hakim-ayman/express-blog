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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const admin_model_1 = require("../modules/Admin/admin.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const adminAuth = (onlySuperAdmin) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // check if the user send the token
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // check if the token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        // check if the user is super admin
        if (onlySuperAdmin === 'onlySuperAdmin' && decoded.email !== config_1.default.super_admin_email) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized!');
        }
        const { id, email, role } = decoded;
        // check if the user is admin
        if (role !== 'admin') {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized!');
        }
        // check if the user is exist. If not, throw an error
        const admin = yield admin_model_1.Admin.findOne({ _id: id, email });
        if (!admin) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The admin is not found');
        }
        next();
    }));
};
exports.default = adminAuth;
