**JavaScript 中的 Class 类详解**

JavaScript中的class是ES6引入的语法糖，本质上是基于原型继承的机制；但提供了更接近于传统的面向对象语言的写法。

概念以及使用：

1) class 是什么：语法糖 + 原型链
2) 最基本结构：constructor、实例方法、原型方法
```
class User {
  constructor(name) {
    this.name = name;     // 实例属性（每个实例一份）
  }

  sayHi() {               // 原型方法（所有实例共享一份）
    return `Hi, ${this.name}`;
  }
}

const u = new User("Ada");
console.log(u.sayHi()); // Hi, Ada
```
4) Getter / Setter：像访问属性一样调用逻辑
```
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(v) {
    if (!v) throw new Error("name required");
    this._name = v;
  }
}

const p = new Person("Tom");
console.log(p.name); // 走 getter
p.name = "Jerry";    // 走 setter
```

汇总：
|特性|描述|示例|
|---|---|---|
|构造函数| 实例化的时候自动调用| constructor(name) { this.name = name; }|
|实例方法| 原型链上的方法| greet() { return 'Hello'; }|
|静态方法| 类本身的方法| static create() { return new this(); }|
|Getter、Setter| 访问器的属性| get area() { ... }|
|继承| extends关键字| class Child extends Parent|
|super| 调用父类的函数或方法| super(name); super.method()|

class语法让JavaScript的面向对象编程变得更加清晰易读；本质上它是基于原型的。
