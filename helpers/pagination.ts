interface ObjectPagination {
  currentPage: number;
  limitItem: number;
  skip?: number;
  totalPage?: number;
}

const paginationHelper = (
  objPagination: ObjectPagination,
  query: Record<string, any>,
  coutRecords: number
): ObjectPagination => {
  // Hỗ trợ cả limit và limitItem từ query
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }
  if (query.limitItem) {
    objPagination.limitItem = parseInt(query.limitItem);
  } else if (query.limit) {
    objPagination.limitItem = parseInt(query.limit);
  }
  objPagination.skip =
    (objPagination.currentPage - 1) * objPagination.limitItem;

  objPagination.totalPage = Math.ceil(coutRecords / objPagination.limitItem);
  return objPagination;
};
export default paginationHelper;
