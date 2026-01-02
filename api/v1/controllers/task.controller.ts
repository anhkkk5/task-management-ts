import Task from "../models/task.model";
import { Request, Response } from "express";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index = async (req: Request, res: Response) => {
  try {
    //find
    interface FindQuery {
      deleted: boolean;
      status?: string;
      title?: RegExp;
    }

    const find: FindQuery = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = String(req.query.status);
    }
    //end find

    // Tìm kiếm theo từ khóa
    const search = searchHelper(req.query);
    if (search.keyword) {
      find.title = search.regex;
    }
    //pagination
    const countTasks = await Task.countDocuments(find); // số lượng tasks
    let objPagination = paginationHelper(
      {
        currentPage: 1,
        limitItem: 2,
      },
      req.query,
      countTasks
    );

    //end pagination

    //sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey.toString();
      sort[sortKey] = req.query.sortValue;
    }
    //end sort

    const tasks = await Task.find(find)
      .sort(sort)
      .limit(objPagination.limitItem)
      .skip(objPagination.skip);

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

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const status: string = req.body.status;
    console.log(id, status);

    await Task.updateOne({ _id: id }, { status: status });

    res.json({ code: 200, message: "Cập nhật trạng thái thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật trạng thái công việc" });
  }
};

//PATCH /api/v1/tasks/change-multi
export const changeMutil = async (req: Request, res: Response) => {
  try {
    const { ids, key, value } = req.body;
    enum ChangeKey {
      STATUS = "status",
      DELETE = "delete",
    }
    switch (key as ChangeKey) {
      case ChangeKey.STATUS:
        await Task.updateMany(
          {
            _id: { $in: ids }, //lấy id trong mảng này
          },
          {
            status: value,
          }
        );
        break;
      case ChangeKey.DELETE:
        await Task.updateMany(
          {
            _id: { $in: ids }, //lấy id trong mảng này
          },
          {
            deleted: true,
            deletedAt: new Date(),
          }
        );
        res.json({
          code: 200,
          message: "Xóa thành công",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại",
        });
        break;
    }

    res.json({
      code: 200,
      message: "Cập nhập trạng thái thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const product = new Task(req.body);
    const data = await product.save();

    res.json({
      code: 200,
      message: "Tạo thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi khi tạo công việc!",
    });
  }
};

//Patch /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );

    res.json({
      code: 200,
      message: "update thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};
