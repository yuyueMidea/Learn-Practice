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
   - 1. 参数类型注解：当你声明一个函数的时候，你可以在每个参数后面添加一个类型注解，声明函数可以接受什么类型的参数。
   ```
   function greet(name: string){
     return 'hello' + name;
   }
   ```
   - 2. 返回值类型注解:你也可以添加返回值的类型注解。返回值的类型注解跟在参数列表后面
   ```
   function getNum(): number{
     return 34;
   }
   ```
- 对象类型（Object Types）
   ```
   function printCood(pt: {x: number, y: number}){
      console.log( pt.x,  pt.y);
   }
   ```
- 联合类型（Union Types）
   - 定义一个联合类型：写一个函数，用来处理字符串或者数字：
   ```
   function printId(id: number | string) {
     console.log("Your ID is: " + id);
   }
   ```
- 类型别名（Type Aliases）：所谓类型别名，顾名思义，一个可以指代任意类型的名字。类型别名的语法是：
   ```
   type Point = {
     x: number;
     y: number;
   };
    
   // Exactly the same as the earlier example
   function printCoord(pt: Point) {
     console.log("The coordinate's x value is " + pt.x);
     console.log("The coordinate's y value is " + pt.y);
   }
    
   printCoord({ x: 100, y: 100 });
   ```
- 接口（Interfaces）:接口声明（interface declaration）是命名对象类型的另一种方式：
   ```
   interface Point {
     x: number;
     y: number;
   }
    
   function printCoord(pt: Point) {
     console.log("The coordinate's x value is " + pt.x);
     console.log("The coordinate's y value is " + pt.y);
   }
    
   printCoord({ x: 100, y: 100 });
   ```
- null 和 undefined: JavaScript 有两个原始类型的值，用于表示空缺或者未初始化，他们分别是 null 和 undefined 。
- 不常见的原始类型：
   - bigInt：ES2020 引入原始类型 BigInt，用于表示非常大的整数：`const oneHundred: bigint = BigInt(100);`
   - symbol：这也是 JavaScript 中的一个原始类型，通过函数 Symbol()，我们可以创建一个全局唯一的引用：`const firstName = Symbol("name");
 
**函数部分**
- 最简单描述一个函数的方式是使用**函数类型表达式（function type expression）。**它的写法有点类似于箭头函数：
   ```
   function greeter(fn: (a: string) => void) {
     fn("Hello, World");
   }
    
   function printToConsole(s: string) {
     console.log(s);
   }
    
   greeter(printToConsole);
   //语法 (a: string) => void 表示一个函数有一个名为 a ，类型是字符串的参数，这个函数并没有返回任何值。
   ```
   - 泛型函数 （Generic Functions）
  ```
  function firstElement<Type>(arr: Type[]): Type | undefined {
     return arr[0];
   }
   ```
  通过给函数添加一个类型参数 Type，并且在两个地方使用它，我们就在函数的输入(即数组)和函数的输出(即返回值)之间创建了一个关联。现在当我们调用它，一个更具体的类型就会被判断出来：
  ```
  // s is of type 'string'
   const s = firstElement(["a", "b", "c"]);
   // n is of type 'number'
   const n = firstElement([1, 2, 3]);
   // u is of type undefined
   const u = firstElement([]);
   ```

**对象类型（Object types）**
- 对象类型可以是匿名的：
   ```
   function greet(person: { name: string; age: number }) {
     return "Hello " + person.name;
   }
   ```
- 也可以使用接口进行定义：
   ```
   interface Person {
     name: string;
     age: number;
   }
    
   function greet(person: Person) {
     return "Hello " + person.name;
   }
   ```
- 属性修饰符（Property Modifiers）:对象类型中的每个属性可以说明它的类型、属性是否可选、属性是否只读等信息。 我们可以在属性名后面加一个 `?` 标记表示这个属性是可选的：
   ```
   interface PaintOptions {
     shape: Shape;
     xPos?: number;
     yPos?: number;
   }
   //在这个例子中，xPos 和 yPos 就是可选属性。
   ```
- readonly 属性（readonly Properties）:在类型检查的时候，一个标记为 readonly的属性是不能被写入的。
   ```
   interface SomeType {
     readonly prop: string;
   }
   ```











