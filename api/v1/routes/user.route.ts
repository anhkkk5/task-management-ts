import { Router } from "express";

const router: Router = Router();

import * as userController from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

//[POST] /api/v1/users/register
router.post("/register", userController.register);
//[POST] /api/v1/users/login
router.post("/login", userController.login);
//[GET] /api/v1/users/detail
router.get("/detail", requireAuth, userController.detail);
export const userRouter: Router = router;
