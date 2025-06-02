TypeScript 之基础入门
---
为什么有TS之类的工具？

JS在运行代码前，其实不知道函数调用的结果。类似：
```
message.toLowerCase();
// message 否能调用？
// message 是否有一个 toLowerCase 属性？
// 如果有，toLowerCase 是可以被调用的吗？
// 如果可以被调用，会返回什么？
```
- 静态类型系统：可以在JS运行前先计算出值的类型（包括值的类型，有什么属性和方法），再决定是否执行程序。
- 代码补全、快速修复：类型检查器有了类型信息，可以在你输入的时候列出可使用的属性、方法。


TypeScript 中文站点: <https://ts.yayujs.com>

**类型工具**
- TypeScript 不仅在我们犯错的时候，可以找出错误，还可以防止我们犯错。
- tsc TypeScript 编译器（tsc，the TypeScript compiler）

**常见类型**
- 原始类型: string，number 和 boolean；举例`let myname: string='zhangsan' `
- 数组（Array）：声明一个类似于 `[1, 2, 3]` 的数组类型，你需要用到语法 number[]
- any：TypeScript 有一个特殊的类型，any，当你不希望一个值导致类型检查错误的时候，就可以设置为 any 。
- 函数（Function）：
   - 参数类型注解：当你声明一个函数的时候，你可以在每个参数后面添加一个类型注解，声明函数可以接受什么类型的参数。
```
function greet(name: string){
  return 'hello' + name;
}
```
   - 返回值类型注解:你也可以添加返回值的类型注解。返回值的类型注解跟在参数列表后面
```
function getNum(): number{
  return 34;
}
```
