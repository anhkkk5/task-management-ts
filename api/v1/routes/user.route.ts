import { Router } from "express";

const router: Router = Router();

import * as userController from "../controllers/user.controller";

//[POST] /api/v1/users/register
router.post("/register", userController.register);
//[POST] /api/v1/users/login
router.post("/login", userController.login);
//[GET] /api/v1/users/detail/:id
router.get("/detail/:id", userController.detail);
export const userRouter: Router = router;
