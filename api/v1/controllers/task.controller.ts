import Task from "../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      deleted: false,
    });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách công việc" });
  }
};

export const detail = async (req: Request, res: Response) => {
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
};
