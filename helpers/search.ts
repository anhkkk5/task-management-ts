interface ObjectSearch {
  keyword: string;
  regex?: RegExp;
}

const searchHelper = (query: Record<string, any>): ObjectSearch => {
  let objectSearch: ObjectSearch = {
    keyword: "",
  };

  // Kiểm tra và làm sạch keyword
  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    // Tạo regex với flag 'i' để không phân biệt hoa thường
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  return objectSearch;
};
export default searchHelper;
