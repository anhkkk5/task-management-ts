import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Task from "./models/task.model";
dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3002;

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
