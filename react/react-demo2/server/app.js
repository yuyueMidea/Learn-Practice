const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
// const cors = require('koa2-cors');
const cors = require('@koa/cors');
const app = new Koa();

// 允许跨域
app.use(cors());

// 解析 JSON 请求体
app.use(bodyParser());

// 注册路由
app.use(blogRoutes.routes()).use(userRoutes.routes()).use(userRoutes.allowedMethods());




const port = 3001;
app.listen(port, () => {
  console.log(`🚀 Koa server running at http://localhost:${port}`);
});
