"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.edit = exports.create = exports.changeMutil = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../../../helpers/pagination"));
const search_1 = __importDefault(require("../../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = {
            deleted: false,
        };
        if (req.query.status) {
            find.status = String(req.query.status);
        }
        const search = (0, search_1.default)(req.query);
        if (search.keyword) {
            find.title = search.regex;
        }
        const countTasks = yield task_model_1.default.countDocuments(find);
        let objPagination = (0, pagination_1.default)({
            currentPage: 1,
            limitItem: 2,
        }, req.query, countTasks);
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toString();
            sort[sortKey] = req.query.sortValue;
        }
        const tasks = yield task_model_1.default.find(find)
            .sort(sort)
            .limit(objPagination.limitItem)
            .skip(objPagination.skip);
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách công việc" });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            deleted: false,
            _id: id,
        });
        console.log(task);
        if (!task) {
            return res.status(404).json({ error: "Không tìm thấy công việc" });
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy chi tiết công việc" });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        console.log(id, status);
        yield task_model_1.default.updateOne({ _id: id }, { status: status });
        res.json({ code: 200, message: "Cập nhật trạng thái thành công" });
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi khi cập nhật trạng thái công việc" });
    }
});
exports.changeStatus = changeStatus;
const changeMutil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids, key, value } = req.body;
        let ChangeKey;
        (function (ChangeKey) {
            ChangeKey["STATUS"] = "status";
            ChangeKey["DELETE"] = "delete";
        })(ChangeKey || (ChangeKey = {}));
        switch (key) {
            case ChangeKey.STATUS:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
                break;
            case ChangeKey.DELETE:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    deleted: true,
                    deletedAt: new Date(),
                });
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
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại",
        });
    }
});
exports.changeMutil = changeMutil;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new task_model_1.default(req.body);
        const data = yield product.save();
        res.json({
            code: 200,
            message: "Tạo thành công",
            data: data,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi khi tạo công việc!",
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, Object.assign(Object.assign({}, req.body), { updatedAt: new Date() }));
        res.json({
            code: 200,
            message: "Cập nhật thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại",
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: "Xóa thành công!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại",
        });
    }
});
exports.deleteTask = deleteTask;
