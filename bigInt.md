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
