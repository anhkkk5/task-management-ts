import express, { Request, Response, Router } from "express";
import Task from "../../../models/task.model";

const router: Router = Router();

// const { index, detail } = require("../controllers/task.controller");
//[Get] /api/v1/tasks
// router.get("/", index);
// //[Get] /api/v1/tasks/detail/id
// router.get("/detail/:id", detail);

// Lấy danh sách công việc
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      deleted: false,
    });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách công việc" });
  }
});
// Lấy chi tiết công việc
router.get("/detail/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const task = await Task.findOne({
      deleted: false,
      _id: id,
    });
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Không tìm thấy công việc" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy chi tiết công việc" });
  }
});
const taskRouter: Router = router;
export { taskRouter };
