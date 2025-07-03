## Promise 原理简介

promise 是 JavaScript中用于处理异步操作的对象；它表示一个还未完成将来会完成的操作；

1、状态机制：
- pending（进行中）：初始状态；
- fulfilled（已成功）：操作成功完成；
- rejected（已失败）：操作失败；
- 状态一旦完成就不可逆：从 pending 变为 fulfilled 或 rejected）；

2、then方法：
- 接收两个参数：onFulfilled 和 onRejected 回调；
- 返回一个新的promise以实现链式调用；
- 根据当前promise的状态立即执行或者存储回调；

3、异步处理：
- 当promise 处于pending状态时，回调函数会被存储起来；
- 在状态改变时（resolve、reject被调用），依次执行存储的回调；
