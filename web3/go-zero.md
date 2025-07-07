**go-zero简介以及如何学习go**

大纲：
- go-zero简介
- go-zero环境搭建
- go-zero杀手锏之 goctl
- API服务之 API编写及自动生成代码
- API服务之 配置文件
- API服务之 serviceContext
- API 服务之 handler
- API服务之 logic
- API服务之 model
- API服务之 middleware
- API服务之 源码解读
- rpc服务之 protobuf编写及自动生成代码
- rpc服务之 serviceContext
- rpc服务之 handler
- rpc服务之 logic
- rpc服务之 model
- rpc服务之 interceptor
- rpc服务之 源码解读
- 服务发现三种方式（直连、etcd、k8s）
- api与rpc基于grpc的metadata传值
- API错误处理
- rpc错误处理
- 使用template来自定义生成代码


go-zero是一个集成了各种工程实践的web和rpc框架。通过弹性设计保证了大并发服务端的稳定性，经受了充分的实战检验。

**缩短从需求到上线的距离** go-zero包含极简的API定义和生成工具`goctl`，可以根据定义的API文件一键生成GO、iOS、Android、Kotlin、Dart、Typescript、JavaScript代码，并可以直接运行。
