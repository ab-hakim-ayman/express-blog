"use strict";
// const generateSlug = (name: string): string => {
// 	return name
// 		.toLowerCase()
// 		.replace(/ /g, '-')
// 		.replace(/[^\w-]+/g, '');
// };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default generateSlug;
const slugify_1 = __importDefault(require("slugify"));
const generateSlug = (title) => {
    return (0, slugify_1.default)(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        replacement: '-',
        locale: 'bn'
    });
};
exports.default = generateSlug;
