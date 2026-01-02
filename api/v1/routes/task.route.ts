import { Router } from "express";

const router: Router = Router();

import * as controller from "../controllers/task.controller";

// [GET] /api/v1/tasks
router.get("/", controller.index);
// [GET] /api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail);

//[Patch] /api/v1/tasks/change-status/:id
router.patch("/change-status/:id", controller.changeStatus);
//[Patch] /api/v1/tasks/change-multi
router.patch("/change-multi", controller.changeMutil);
//[Post] /api/v1/tasks/create
router.post("/create", controller.create);
//[Patch] /api/v1/tasks/edit/:id
router.patch("/edit/:id", controller.edit);
//[Delete] /api/v1/tasks/delete/:id
router.delete("/delete/:id", controller.deleteTask);
const taskRouter: Router = router;
export { taskRouter };
