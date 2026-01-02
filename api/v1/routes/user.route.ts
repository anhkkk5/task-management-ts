import { Router } from "express";

const router: Router = Router();

import * as userController from "../controllers/user.controller";

//[POST] /api/v1/users/register
router.post("/register", userController.register);

export const userRouter: Router = router;
