## JavaScript 中 for...of 和 for...in 的区别及代码示例

主要区别：
| 特性	| for...in	| for...of
|-------|-----------|---------
| 遍历内容	| 对象的可枚举属性（包括原型链）	| 可迭代对象的值
| 返回值	| 属性名（键/key）	| 属性值（value）
| 适用对象	| 普通对象	| 数组、字符串、Map、Set等可迭代对象
| 原型属性	| 会遍历原型链上的可枚举属性	| 不会遍历原型链
| 顺序	| 不保证顺序	| 按迭代器顺序

for...in 示例（遍历对象属性）
```
const obj = {
    name:'zsd',
    age:33
}
// 给原型添加属性
Object.prototype.country='cc'

for(let key in obj) {
    console.log(key)
}
console.log('-'.repeat(11))
// 使用 hasOwnProperty 过滤原型属性
for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
        console.log(key)
    }
}
```

for...of 示例（遍历数组值）
```

const arr = [1,2,'a']
for(const val of arr) {
    console.log(val)
}
// 遍历字符串
for(let v of 'hello') {
    console.log(v)
}
```

**使用場景**
- 使用for...in：遍历对象的所有属性，检查对象包含哪些属性；
- 使用for...of：遍历数组，字符串等集合的值；
- 简单记忆口诀："in 拿钥匙 of 拿值"，（for...in 获取键/key，for...of 获取值/value）。







