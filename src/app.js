const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 通用函数：为指定资源添加仅限字段的 _q 搜索
function addFieldSearch(resource, searchableFields = ["title"]) {
  server.get(`/${resource}`, (req, res, next) => {
    const { _q } = req.query;
    if (_q) {
      const data = router.db.get(resource).value();
      if (!Array.isArray(data)) {
        return next(); // 非数组资源跳过
      }
      const filtered = data.filter((item) =>
        searchableFields.some(
          (field) =>
            item[field] &&
            String(item[field]).toLowerCase().includes(String(_q).toLowerCase())
        )
      );
      return res.json(filtered);
    }
    next(); // 无 _q 则交还给 json-server 默认处理
  });
}

// 应用到 posts 资源，仅在 title 字段搜索
addFieldSearch("posts", ["title"]);
// 如果以后需要支持 comments 的 text 字段：
addFieldSearch('comments', ['text']);

server.use(router);
server.listen(3000, () => {
  console.log("Mock API server running on http://localhost:3000");
});
