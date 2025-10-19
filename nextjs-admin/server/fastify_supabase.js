require('dotenv').config();
const fastify = require('fastify');

async function build() {
    const app = fastify({ logger: true });
    // 允许跨域
    await app.register(require('@fastify/cors'), {
        origin: (origin, cb) => {
            // 允许本地文件打开（origin === 'null'）以及常见本地开发域名
            if (!origin) return cb(null, true); // 某些浏览器/请求可能没有 Origin
            const ok =
                origin === 'null' ||
                origin.startsWith('http://localhost') ||
                origin.startsWith('http://127.0.0.1');
            cb(null, ok);
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })

    // 1) 注册数据库（fastify-plugin，全局可见）
    app.register(require('./plugins/db'));

    // 2) 注册路由（保持封装，前缀化）
    app.register(require('./routes/users'), { prefix: '/api' });

    return app;
}

build()
    .then(app => app.listen({ port: Number(process.env.PORT || 3000), host: '0.0.0.0' }))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
