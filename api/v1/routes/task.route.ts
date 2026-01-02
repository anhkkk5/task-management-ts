import { Router } from "express";

const router: Router = Router();

import * as controller from "../controllers/task.controller";

// [GET] /api/v1/tasks
router.get("/", controller.index);
// [GET] /api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail);

const taskRouter: Router = router;
export { taskRouter };
