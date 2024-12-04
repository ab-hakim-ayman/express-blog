import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import AdminControllers from "./admin.controllers";
import AdminValidation from "./admin.validations";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AdminValidation.LoginValidationSchema),
  AdminControllers.loginAdmin,
);

const adminRouters = router;

export default adminRouters;
