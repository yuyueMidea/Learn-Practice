docker是一个开源的**容器化平台**，用于开发、部署和运行应用程序。它允许开发者将应用及其依赖环境打包成轻量级、可移植的容器；从而实现“一次构建、到处运行”的目标。

**一、Docker的核心概念：**

- 1、容器（Container）：轻量级、独立运行的软件单元；包含应用程序及其运行环境（代码、运行时、系统工具、库等）；
- 2、镜像（Image）：容器的静态模版，类似于软件安装包；
- 3、Dockerfile：一个文本文件，用于**定义如何构建镜像**，如安装依赖，复制文件等。
- 4、Docker compose：用于管理多个容器（如同时运行web +数据库），通过docker-compose.yml文件定义服务；

**二、Docker的优势**

| 特性	| 说明
|-------|-------
| 跨平台	| 可在 Windows、Linux、macOS 运行
| 环境一致性	| 开发、测试、生产环境一致，避免“在我机器上能跑”问题
| 快速部署	| 秒级启动容器，比虚拟机（VM）快得多
| 资源高效	| 多个容器共享 OS 内核，占用资源少
| 微服务友好	| 适合拆分成多个独立容器（如前端、后端、数据库）
| 版本控制	| 镜像可版本化管理，方便回滚

**三、Docker的典型应用场景**

- 1、应用打包与分发
- 2、CI、CD（持续集成、持续部署）
- 3、微服务架构
- 4、快速搭建开发环境
- 5、云原生与 `kubernetes`

**四、Docker基本命令**
| 命令	| 说明
|-------|---------
| docker run -d -p 80:80 nginx	| 启动 Nginx 容器（后台运行，映射端口 80）
| docker ps	| 查看运行中的容器
| docker images	| 查看本地镜像
| docker build -t myapp .	| 根据 Dockerfile 构建镜像
| docker exec -it <容器ID> bash	| 进入容器内部
| docker stop <容器ID>	| 停止容器
| docker-compose up -d	| 启动 Compose 定义的所有服务

**五、Docker架构**

- Docker客户端（CLI）：用户通过命令操作（如docker run）；
- Docker守护进程（）：负责管理容器、镜像等；
- Docker hub、Registry：存储和分发镜像的仓库。
