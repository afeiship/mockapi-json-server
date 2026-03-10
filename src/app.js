const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 支持 _per_page 参数（转换为 _limit）并设置默认分页
server.use((req, res, next) => {
  // 如果指定了 _per_page，转换为 _limit
  if (req.query._per_page) {
    req.query._limit = req.query._per_page;
  }

  // 如果既没有 _limit 也没有 _per_page，设置默认值为 10
  if (!req.query._limit && !req.query._per_page) {
    req.query._limit = "10";
  }

  next();
});

// 重写 router 的响应方法
router.render = function (req, res) {
  const data = res.locals.data;

  // 如果是数组类型的数据（列表查询）
  if (Array.isArray(data)) {
    // 获取资源的名称（例如：posts, comments）
    const resourceName = req.path.split("/")[1];

    // 从数据库获取完整的原始数据以计算准确的 total
    let total = data.length;
    try {
      const fullData = router.db.get(resourceName).value();
      if (Array.isArray(fullData)) {
        total = fullData.length;
      }
    } catch (e) {
      // 如果获取失败，使用当前数据的长度
      total = data.length;
    }

    // json-server 已经处理了分页，所以我们直接使用 data
    return res.jsonp({
      data: data,
      total: total,
    });
  }

  // 如果是对象类型的数据（单条记录或其他对象）
  if (data !== null && typeof data === "object") {
    return res.jsonp({
      data: data,
    });
  }

  // 其他类型直接返回
  return res.jsonp(data);
};

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
            String(item[field])
              .toLowerCase()
              .includes(String(_q).toLowerCase()),
        ),
      );
      // 返回包装格式
      return res.json({
        data: filtered,
        total: filtered.length,
      });
    }
    next(); // 无 _q 则交还给 json-server 默认处理
  });
}

// 应用到 posts 资源，仅在 title 字段搜索
addFieldSearch("posts", ["title"]);
// 如果以后需要支持 comments 的 text 字段：
addFieldSearch("comments", ["text"]);

server.use(router);
server.listen(3008, () => {
  console.log("Mock API server running on http://localhost:3000");
});
