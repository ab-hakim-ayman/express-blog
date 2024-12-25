"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_controllers_1 = __importDefault(require("./comment.controllers"));
const comment_validations_1 = __importDefault(require("./comment.validations"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(comment_validations_1.default.createCommentValidation), comment_controllers_1.default.createComment);
router.get('/:blogId', comment_controllers_1.default.getCommentsByBlogId);
router.put('/:id', (0, adminAuth_1.default)(), (0, validateRequest_1.default)(comment_validations_1.default.updateCommentValidation), comment_controllers_1.default.updateComment);
router.delete('/:id', (0, adminAuth_1.default)(), comment_controllers_1.default.deleteComment);
const CommentRoutes = router;
exports.default = CommentRoutes;
