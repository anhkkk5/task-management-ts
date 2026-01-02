import { Router } from "express";

const router: Router = Router();

import * as controller from "../controllers/task.controller";

// [GET] /api/v1/tasks
router.get("/", controller.index);
// [GET] /api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail);

//[Patch] /api/v1/tasks/change-status/:id
router.patch("/change-status/:id", controller.changeStatus);
const taskRouter: Router = router;
export { taskRouter };
