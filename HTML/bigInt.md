**JavaScript 中的 BigInt 详解**

BigInt 是 JavaScript 中的一种数字类型，用于表示任意精度的整数。它可以表示大于 2^53 - 1（即 Number.MAX_SAFE_INTEGER）的整数，解决了 JavaScript 中数字类型的精度限制问题。
- 基本特性，创建 BigInt：
```
const bigInt = 1234567890123456789012345678901234567890n;    //字面量表示法：在数字后加 n
const bigInt = BigInt("1234567890123456789012345678901234567890");    //构造函数
```
- 类型检测：
```
typeof 1n; // "bigint"
typeof BigInt(1); // "bigint"
```

**与 Number 类型的区别**
- 精度方面：Number 类型有精度限制（±(2^53 - 1)）；BigInt 可以表示任意大的整数（只受内存限制）；
- 类型转换：BigInt 不能与 Number 直接混合运算；比较运算符可以混合使用；

**运算规则**
- 算术运算
```
const a = 123456789012345678901234567890n;
const b = 987654321098765432109876543210n;

a + b; // 1111111110111111111011111111100n
a - b; // -864197532086419753208641975320n
a * b; // 121932631137021795226185032733622923332237463801111263526900n
a / b; // 0n (截断小数部分)
a % b; // 123456789012345678901234567890n
```
- 比较运算：
```
1n < 2;    // true
2n > 1;    // true
2n == 2;   // true
2n === 2;  // false (类型不同)
```

**类型转换**
- 显式转换：
```
BigInt(123); // 123n
Number(123n); // 123
```

**使用场景**
- 大整数计算
```
// 计算斐波那契数列大数
function fibonacci(n) {
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
console.log(fibonacci(1000)); // 非常大的数
```
- 高精度时间戳：`const timestamp = BigInt(Date.now()) * 1000000n;`

**注意事项**
- 不能被JSON序列化：`JSON.stringify({ num: 123n }); // TypeError: Do not know how to serialize a BigInt`;
- 浏览器兼容性：`ES2020 标准引入,现代浏览器和 Node.js 10.4+ 支持`;
- 性能考虑：BigInt 运算通常比 Number 慢；只在需要大整数时使用；

总结：BigInt 为 JavaScript 带来了处理大整数的能力，特别适合金融计算、密码学、科学计算等领域需要高精度整数运算的场景。





