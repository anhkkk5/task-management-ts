import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Task from "./models/task.model";
dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3002;
// Lấy danh sách công việc
app.get("/tasks", async (req: Request, res: Response) => {
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
app.get("/tasks/detail/:id", async (req: Request, res: Response) => {
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

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
