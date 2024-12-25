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
exports.Admin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
//! pre save middleware/hook || hashing password
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const admin = this;
        admin.password = yield bcryptjs_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
//checking if user is already exist!
adminSchema.statics.isAdminExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingAdmin = yield exports.Admin.findById(id).select('+password');
        return existingAdmin;
    });
};
adminSchema.statics.isPasswordMatched = function (plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(plainPassword, hashedPassword);
    });
};
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
