**1) 联合类型 & 交叉类型 + 类型收窄（narrowing）**
- A | B：值可能是 A 或 B。
- A & B：值同时满足 A 与 B（多用于“混合”对象）。
- 收窄：在运行时代码里“排除”不可能的分支，让类型更具体。
```
//定义一个类型别名【可以是字符串或数值这两种类型】，方便后面引用
type stringNumber = string | number;
let name1: stringNumber = 'zhangas';
let age1: stringNumber = 25;
```

**2) 字面量类型、as const 与 satisfies**
- 是什么：把字符串/数字等值固定成字面量类型；as const 把对象/数组“冻结”为最窄类型；satisfies 校验对象是否满足某个类型，同时保持更精细的推断。
```
const METHOD = ['GET', 'POST', 'PUT'] as const;
// type Method = 'GET' | 'POST' | 'PUT'
type Method = typeof METHOD[number];

type Route = { path: string; method: Method };

const route = {
  path: '/users',
  method: 'GET',
} satisfies Route; // 校验通过且不丢失具体字面量
```
