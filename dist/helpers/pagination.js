"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objPagination, query, coutRecords) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    if (query.limitItem) {
        objPagination.limitItem = parseInt(query.limitItem);
    }
    else if (query.limit) {
        objPagination.limitItem = parseInt(query.limit);
    }
    objPagination.skip =
        (objPagination.currentPage - 1) * objPagination.limitItem;
    objPagination.totalPage = Math.ceil(coutRecords / objPagination.limitItem);
    return objPagination;
};
exports.default = paginationHelper;
