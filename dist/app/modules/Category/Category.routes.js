"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../../middlewares/adminAuth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Category_controllers_1 = __importDefault(require("./Category.controllers"));
const Category_validations_1 = __importDefault(require("./Category.validations"));
const router = express_1.default.Router();
// all routes start with /api/categories. all routes are protected and only an admin can access them.
router.post('/', (0, adminAuth_1.default)(), (0, validateRequest_1.default)(Category_validations_1.default), Category_controllers_1.default.CreateCategory);
router.get('/', Category_controllers_1.default.GetCategories);
router.get('/:id', Category_controllers_1.default.GetCategoryById);
router.put('/:id', (0, adminAuth_1.default)(), (0, validateRequest_1.default)(Category_validations_1.default), Category_controllers_1.default.UpdateCategoryById);
router.delete('/:id', (0, adminAuth_1.default)(), Category_controllers_1.default.DeleteCategoryById);
const CategoryRoutes = router;
exports.default = CategoryRoutes;
