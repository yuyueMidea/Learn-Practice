## TypeScript 前端面试题汇总及解答

1、TypeScript 与 JavaScript 的主要区别是什么？
- 静态类型检查：Typescript在编译时进行类型检查，JavaScript时动态类型；
- 类型注解：typescript支持类型注解，JavaScript不支持；
- 接口和泛型：typescript有接口和泛型等高级类型特性；
- 编译过程：typescript需要编译为JavaScript才能运行；
- ES6+ 特性支持：TypeScript 支持最新的 ECMAScript 特性并可以编译为旧版 JavaScript；

2、typescript中的 any 和unknown 有什么区别？
- any：关闭所有类型检查、可以赋值给任何类型，可以从任何类型接收值，可以访问任意属性和方法；
- unknown：类型安全的any，不能赋值给非 unknown 或 any 的类型，不能直接访问属性或调用方法，需要类型断言或类型检查后才能使用；
```
let anyValue: any = 'hello';
anyValue.foo(); // 不会报错

let unknownValue: unknown = 'hello';
unknownValue.foo(); // 错误：Object is of type 'unknown'
if (typeof unknownValue === 'string') {
  unknownValue.toUpperCase(); // 正确
}
```
