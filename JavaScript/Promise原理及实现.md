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

4、链式调用：
- 每次调用then都会返回一个新的promise；
- 前一个then的返回值作为下一个then的参数；

**微任务机制**

原生promise的回调执行是 通过微任务（microtask queue）队列来实现的，这样保证了：
- 比 setTimeout 宏任务更早执行；
- 在当前事件循环的末尾、下一个事件循环开始前执行；

常用方法：
- Promise.resolve()：创建一个已解决的promise；
- Promise.reject()：创建一个已拒绝的promise；
- Promise.all()：所有成功才成功；任意一个失败旧失败；
- Promise.race()：取得最先完成的结果；
- Promise.allSettled()：等待所有的promise完成（无论成功失败）；

Promise的设计模式解决了回调地狱，使得异步代码便于编写和维护；

JavaScript 中同时执行多个异步操作的 Promise 方案：
- Promise.all()：最常用的并行执行方案，接收一个Promise数组，当所有Promise都成功时 返回结果数组，任一一个失败立即拒绝；特点是全成功才成功，快速失败机制；
```
const promises = [fetch(url1), fetch(url2), fetch(url3)];
Promise.all(promises)
  .then(results => console.log(results))
  .catch(err => console.error(err));
```
- Promise.allSettled(): ES2020新增的，无论成功失败都会等待所有Promise完成，返回包含每个Promise状态和结果的对象数组；特点是不中断执行，获取全部最终状态；
```
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if(result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.error(result.reason);
      }
    });
  });
```
- Promise.race()：返回最先完成的Promise结果（无论成功或失败）；典型应用是实现请求超时控制；
```
Promise.race([fetchAPI(), timeout(5000)])
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
- Promise.any()： ES2021新增的，返回第一个成功的Promise，全部失败时才拒绝；特点是获取首个可用结果；
```
Promise.any(promises)
  .then(firstSuccess => console.log(firstSuccess))
  .catch(err => console.error('All failed', err));
```

---

以下是几种常见的 Promise 并发执行方案及对应的代码示例：
- Promise.all() - 全部成功才成功
```
const fetchUser = () => fetch('/api/user').then(res => res.json());
const fetchPosts = () => fetch('/api/posts').then(res => res.json());
const fetchComments = () => fetch('/api/comments').then(res => res.json());

// 同时发起三个请求
Promise.all([fetchUser(), fetchPosts(), fetchComments()])
  .then(([user, posts, comments]) => {
    console.log('用户:', user);
    console.log('文章:', posts);
    console.log('评论:', comments);
  })
  .catch(error => {
    console.error('有一个请求失败了:', error);
  });
```
- Promise.allSettled() - 获取所有结果无论成功失败:
```
const apis = [
  fetch('/api/data1').then(res => res.json()),
  fetch('/api/data2').then(res => res.json()),
  fetch('/api/not-exist').catch(err => ({ error: err.message })) // 故意失败的请求
];

Promise.allSettled(apis)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`请求 ${index} 成功:`, result.value);
      } else {
        console.log(`请求 ${index} 失败:`, result.reason);
      }
    });
  });
```
- Promise.race() - 获取最先完成的结果:
```
const timeout = ms => new Promise((_, reject) => 
  setTimeout(() => reject(new Error(`超时 ${ms}ms`)), ms));

// 请求比赛：要么获取数据，要么超时
Promise.race([
  fetch('/api/slow-data').then(res => res.json()),
  timeout(3000)
])
  .then(data => {
    console.log('获取数据成功:', data);
  })
  .catch(err => {
    console.error('错误:', err.message); // 3秒内没响应则显示超时
  });
```

- Promise.any() - 获取第一个成功的结果:
```
const mirrorServers = [
  'https://mirror1.example.com/data',
  'https://mirror2.example.com/data',
  'https://backup.example.com/data'
];

Promise.any(mirrorServers.map(url => 
  fetch(url).then(res => res.json())
))
  .then(data => {
    console.log('从最快的可用镜像获取数据:', data);
  })
  .catch(err => {
    console.error('所有镜像都不可用:', err);
  });
```
- 使用 async/await 实现并发:
```
async function fetchAllData() {
  try {
    // 同时启动所有请求
    const userPromise = fetchUser();
    const postsPromise = fetchPosts();
    const commentsPromise = fetchComments();
    
    // 等待所有请求完成
    const user = await userPromise;
    const posts = await postsPromise;
    const comments = await commentsPromise;
    
    console.log({ user, posts, comments });
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

fetchAllData();
```
---

Promise 的 then() 方法返回一个新的 Promise，这使得我们可以实现链式调用。下面通过简单代码示例演示这一特性：
```
// 创建一个初始 Promise
let p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve(1)
    }, 1000);
})
// 链式调用
p1.then(result =>{
    console.log({result});          //1
    return result *2
}).then(result2 =>{
    console.log({result2});         //2
    return result2+3
}).then(result3 =>{
    console.log({ result3 })        //5
}).then(result4 =>{
    console.log({ result4 })        //undefined
})

// 异步操作链式调用
function asyncAdd(a, b) {
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve( a+ b);
        }, 200);
    })
}

asyncAdd(2, 3).then(result =>{
    console.log('first_res: ', result);         //5
    return asyncAdd(result ,4)                  // 返回一个新的 Promise
}).then(result2 =>{
    console.log('sec_res: ', result2)           //9
    return asyncAdd(result2, 3)
}).then(result3 =>{
    console.log('finally_res: ', result3)       //最终结果，2+3+4+3 =12
})

// 返回 Promise 的链式调用
function fetchUser() {
    return new Promise(resolve => resolve({ id: 1, name:'zzsa'}))
}
function fetchOrders(userId) {
    console.log({ userId })
    return new Promise(resolve => resolve( [{id:1, total:100}, {id:2, total:120}] ))
}
fetchUser().then(user =>{
    console.log('获取用户:', user);
    return fetchOrders(user.id)
}).then(res=>{
    console.log('获取订单:', res );
}).catch(error =>{
    console.error('err: ', error )
})
```
关键点：
- 每个then（）都返回一个新的Promise，
- 如果回调返回普通值，新Promise会用该值解决；
- 如果回调返回Promise，会等待该Promise解决；
- 如果回调抛出错误，新Promise会被拒绝；
- 这种机制使得我们可以将多个异步操作 串联起来。






