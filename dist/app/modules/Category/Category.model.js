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
const mongoose_1 = require("mongoose");
const generateSlug_1 = __importDefault(require("../../utils/generateSlug"));
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
});
CategorySchema.pre('save', function (next) {
    this.slug = (0, generateSlug_1.default)(this.name);
    next();
});
CategorySchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.name) {
            update.slug = (0, generateSlug_1.default)(update.name);
            this.setUpdate(update);
        }
        next();
    });
});
const Category = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = Category;
