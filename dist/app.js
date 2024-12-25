"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://aic-blog-client.vercel.app',
        'https://aic-blog-dashboard.vercel.app',
        'https://preparationacademybd.com',
        'https://dashboard.preparationacademybd.com'
    ],
    credentials: true
}));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'The server is running'
    });
});
// global error handler middleware
app.use(globalErrorHandler_1.default);
// not found middleware
app.use(notFound_1.default);
exports.default = app;
