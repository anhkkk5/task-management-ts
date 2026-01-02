import Task from "../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    //find
    interface FindQuery {
      deleted: boolean;
      status?: string;
    }

    const find: FindQuery = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = String(req.query.status);
    }
    //end find

    //sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey.toString();
      sort[sortKey] = req.query.sortValue;
    }
    //end sort
    const tasks = await Task.find(find).sort(sort);

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
